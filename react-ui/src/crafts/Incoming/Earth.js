import axios from 'axios'

export default class Earth {
  constructor(p) {
    this.p = p
    this.size = p.map (p.windowWidth, 100, 1000, 80, 200);
    this.fetchEPIC()

  }

  fetchEPIC() {
    var p = this.p;
    var that = this;

    p.loadImage('http://' + window.location.host + '/api/epic_image', function (img) {
      that.earth_img = img;
      console.log('downloaded image')
    }, function (error) {
      console.log('error')
    })
  }

  draw() {
    var p = this.p;
    p.background(0);
    if (this.earth_img) {
      p.image(this.earth_img, p.windowWidth/2, p.windowHeight/2, this.size, this.size)
    }
  }


}