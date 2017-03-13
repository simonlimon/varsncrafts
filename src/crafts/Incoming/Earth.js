import axios from 'axios'
import config from '../../config'

export default class Earth {
  constructor(p) {
    this.p = p
    this.size = p.map (p.windowWidth, 100, 1000, 10, 100);
    this.fetchEPIC()
  }

  fetchEPIC() {
    var that = this;
    axios.get('https://epic.gsfc.nasa.gov/api/natural').then(function (result) {
      console.log(result)
      var image_link = "https://epic.gsfc.nasa.gov/archive/natural/2017/03/08/png/" + result.data[0].image +'.png';


      that.img = that.p.createImg(image_link);

      // that.p.loadImage(image_link, function (img) {
      //   console.log('image loaded')
      //   that.p.image(img, 0, 0);
      // }, function (error) {
      //   console.log('image fail')
      //   console.log(error)
      // })

    })
  }

  draw() {
    this.p.ellipse(this.p.windowWidth/2, this.p.windowHeight/2, this.size, this.size)
  }


}