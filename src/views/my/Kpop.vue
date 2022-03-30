<template>
  <div class="kpop_page">
    <div class="mine">
      <three :play="isPlay" :detail="audio.lrc">
        <template v-slot:img_1>
          <img src="https://cdn.homeblog.top/uPic/MAuAvR.png&swiper" />
        </template>
        <template v-slot:img_2>
          <img src="https://cdn.homeblog.top/uPic/616Bhk.png&swiper" />
        </template>

        <template v-slot:popular>
          <div class="popular">Popular today</div>
        </template>

        <template v-slot:kpop>
          <div class="hot-item" @click="toDetail">
            <img
              src="https://cf.mora.jp/contents/package/0000/00000087/0020/930/026/0020930026.200.jpg"
            />
            Voltage【ITZY】
          </div>
          <div class="hot-item">
            <img
              src="https://cf.mora.jp/contents/package/0000/00000007/0020/913/845/0020913845.200.jpg"
            />
            'The ReVe'【Red Velvet】
          </div>
          <div class="hot-item">
            <img
              src="	https://cf.mora.jp/contents/package/0000/00000087/0020/922/914/0020922914.200.jpg"
            />
            Just be yourself【TWICE】
          </div>
          <div class="hot-item">
            <img
              src="https://cf.mora.jp/contents/package/0000/00000085/0015/068/896/0015068896.200.jpg"
            />
            reality in BLACK【MAMAMOO】
          </div>
          <div class="hot-item">
            <img
              src="https://cf.mora.jp/contents/package/0000/00000196/0019/507/438/0019507438.200.jpg"
            />
            Scars【Stray Kids】
          </div>
          <div class="hot-item">
            <img
              src="https://cf.mora.jp/contents/package/0000/00000083/0019/837/156/0019837156.200.jpg"
            />
            Strawberry moon【IU】
          </div>
        </template>

        <template v-slot:min-music>
          <div class="music" v-if="isPlay">
            <aplayer :audio="audio" :lrcType="1" mini />
          </div>
        </template>
      </three>
    </div>
  </div>
</template>

<script>
import Three from "../../position/Three.vue";
export default {
  components: { Three },
  data() {
    return {
      isPlay: false,
      audio: {
        name: "Voltage",
        artist: "ITZY",
        url: "https://7072-prod-6gxbgo16a53716b3-1306617900.tcb.qcloud.la/obj_wo3DlMOGwrbDjj7DisKw_13518021451_c4ec_82b7_91ba_fe25dbabbb1483af7ee8035fbd73a80e.mp3?sign=b6f3b638fed2dbb66feacc36c70f71e0&t=1648424966",
        cover:
          "http://p4.music.126.net/CEL5Cdy1s9UwytYtW-YmXw==/109951167168855745.jpg",
        lrc: "[00:00.000] 作词 : Mayu Wakisaka\n[00:01.000] 作曲 : Ayushy/Charlotte Wilson/Frankie Day/SELAH/THE HUB 88\n[00:18.010] 甘くみないで Just a girl\n[00:20.045] No way no way no way\n[00:22.433] 本気を出したら Shake the world\n[00:24.849] 世界観 Upside down\n[00:26.878] Yeah 心の奥には Fever\n[00:29.307] 抑えきれないかも\n[00:31.427] Calm down calm down でも\n[00:34.485] 爆発しそう\n[00:35.702] Boom Boom Pop\n[00:36.867]\n[00:37.206] 揺れ出すグラグラとYou can’t take control\n[00:38.487] Getting so hot 今気付いたんでしょ?\n[00:40.463] Temperature up\n[00:41.545] Temperature up\n[00:42.508] Ah ジリジリ聞こえてくるわ Fire alarm\n[00:44.956]\n[00:45.193] Hot Hot Hot Hot\n[00:46.374] 上がるわ Tension\n[00:47.267] もうすぐ形勢逆転ね ゾクゾク\n[00:49.460] Like a dynamite\n[00:51.517] 火がついたら止めらんない\n[00:54.112]\n[00:54.415] My senses\n[00:56.689] 目覚めたように\n[00:58.644] Tell me can you feel me blowing up up U-U-U-Up\n[01:02.569]\n[01:02.843] Boom ついに完全爆発 My voltage up\n[01:07.125] 出口見つけたわ Power\n[01:09.576] 赤い電光のPanorama\n[01:11.751] You can’t escape 覚悟決めて You can’t say no\n[01:17.089] 私の情熱に飲み込まれたら\n[01:20.547]\n[01:21.093] Boom Boom Pow blowing up\n[01:22.936] Bring my voltage up\n[01:25.219] Boom Boom Pow burning up\n[01:27.591] Bring my voltage up\n[01:29.914] Hot damn 行きたい方向へ Go straight\n[01:32.875] 今、目かがやかせ\n[01:33.963] 未来を目指すの\n[01:36.470] Ah I wanna see you all burn up\n[01:39.248]\n[01:39.507] Hot spot\n[01:40.041] That’s where I’ll be\n[01:40.790] 私歩くだけで You can feel the heat\n[01:43.370] 冷めた目つき\n[01:44.630] Just one look\n[01:45.590] 見て見ぬ振り\n[01:46.556] But you’re hooked\n[01:47.944]\n[01:48.153] Tick Tock Tick Tock\n[01:48.863] 聞こえる Timer\n[01:49.771] 溢れる Passion 逃げられっこないわ\n[01:52.337] Just like a grenade\n[01:54.523] 火がついたら燃えるだけ\n[01:56.731]\n[01:56.966] High fever\n[01:59.237] 振り切れたように\n[02:00.759] Tell me can you feel me blowing up up U-U-U-Up\n[02:05.567]\n[02:05.804] Boom ついに完全爆発 My voltage up\n[02:10.263] 出口見つけたわ Power\n[02:12.109] 赤い電光のPanorama\n[02:14.293] You can’t escape 覚悟決めて You can’t say no\n[02:19.692] 私の情熱に飲み込まれたら\n[02:23.383]\n[02:23.646] Hot damn 行きたい方向へ Go straight\n[02:28.817] 進め At the speed of light\n[02:30.466] Always 全て自分で決めたことだから OK\n[02:34.859] Hot damn ためらって止まったなら時間が無駄\n[02:39.908] 未来を目指すの\n[02:41.492] Ah I wanna see you all burn up\n[02:43.972]\n[02:44.208] Wake up call\n[02:46.418] 本能\n[02:48.626] 覚醒の時が来た\n[02:52.579] With my eyes open wide\n[02:55.657] 焼きつけるわ\n[02:57.341] I’ll put the world on fire\n[03:01.409]\n[03:01.664] Boom 高く燃え上がるわ My voltage up\n[03:06.794] 周り巻き込むアルファ\n[03:08.550] 一分一秒が正念場\n[03:10.206] You can’t cool me 熱したら冷めない Type no no\n[03:15.650] 灼熱の世界\n[03:17.260] ひき込まれたら\n[03:19.688]\n[03:19.898] Boom Boom Pow blowing up\n[03:21.785] Bring my voltage up\n[03:23.860] Boom Boom Pow burning up\n[03:26.381] Bring my voltage up\n[03:28.556] Hot damn 今すぐ世界\n[03:30.707] 揺るがすほどの衝撃\n[03:32.892] 未来を目指すの\n[03:35.196] Ah I wanna see you all burn up\n",
      },
    };
  },

  methods: {
    toDetail() {
      // this.$router.push({ path: "/Kpop" });
      this.isPlay = true;
    },
  },
};
</script>

<style lang="less">
.popular {
  margin-top: 5vh;
  margin-bottom: 5vh;
  font-size: 24px;
  font-weight: 450;
  text-align: left;
  margin-left: 5vw;
}

.poemList {
  display: flex;
  flex-direction: column;
  margin-left: 2vw;
  margin-bottom: 4vh;
  cursor: pointer;
  img {
    width: 130px;
    height: 130px;
    border-radius: 12px;
  }
}
</style>