/*
 * @Description: 这是***页面
 * @Date: 2021-01-24 11:02:49
 * @LastEditTime: 2021-01-27 12:05:32
 */
export default {
  data () {
    return {
      loading: false,
      list: [],
      pageIndex: [],
      total: [],
      canLoadMore: []
    }
  },
  methods: {
    paramsList () {
      const list = [];
      const pageIndex = [];
      const total = [];
      const canLoadMore = []
      this.tabList.forEach(item => {
        list.push([]);
        canLoadMore.push(true)
        pageIndex.push(1);
        total.push(0);
      });
      this.list = list;
      this.canLoadMore = canLoadMore
      this.pageIndex = pageIndex;
      this.total = total;
    },
    toast () {
      this.$toast.loading({
        duration: 0,
        type: "loading",
        message: "加载中...",
        forbidClick: true
      });
    },
    tabChange (index) {
      if (this.list[index].length === 0) {
        this.pageIndex[index] = 1;
        this.getList()
      } else {
        this.$refs.scrollContent.scrollTop = 0;
      }
    },

    collapse (ref) {
      const element = this.$refs[ref][0];
      const height = element.offsetHeight;
      if (height === 0) {
        element.style.display = "block";
        this.$nextTick(() => {
          const elemetCont = this.$refs[`${ref}Cont`][0];
          const Contheight = elemetCont.offsetHeight;

          element.style.height = Contheight + "px";
          this.$refs[`${ref}Icon`][0].style.transform = "rotate(-180deg)";
        });
      } else {
        element.style.height = 0;
        const elemetCont = this.$refs[`${ref}Cont`][0];
        const Contheight = elemetCont.offsetHeight;
        this.$refs[`${ref}Icon`][0].style.transform = "rotate(0deg)";
        setTimeout(() => {
          element.style.display = "none";
        }, 300);
      }
    },
    couponType (item) {
      if (item.couponType === 10) {
        return `无门槛立减`;
      } else if (item.couponType === 20) {
        return `满${item.satisfyAmount}元可用`;
      } else if (item.couponType === 40) {
        return `满${item.satisfyAmount}元可用`;
      }
    }
  }
}