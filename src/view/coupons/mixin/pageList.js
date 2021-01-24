/*
 * @Description: 这是***页面
 * @Date: 2021-01-24 11:02:49
 * @LastEditTime: 2021-01-24 12:37:02
 */
export default {
  data () {
    return {
      loading: false,
      list: [],
      pageIndex: [],
      total: []
    }
  },
  methods: {
    paramsList () {
      const list = [];
      const pageIndex = [];
      const total = [];
      this.tabList.forEach(item => {
        list.push([]);
        pageIndex.push(1);
        total.push(0);
      });
      this.list = list;
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
    }
  }
}