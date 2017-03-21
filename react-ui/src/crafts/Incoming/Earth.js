import $ from 'jquery'
import axios from 'axios'

export default class Earth {

  constructor(p, callback) {
    this.p = p
    this.size = p.map (p.windowWidth, 100, 1000, 80, 200);
    this.fetchEPIC(callback)
    var that = this
    axios.get('api/epic_image/meta').then(function (result) {
      that.meta = result.data
      that.add_popup()
    })
  }

  draw() {
    var p = this.p;
    p.background(0);

    if (this.earth_img) {
      p.image(this.earth_img, 0, 0, this.size, this.size)
    }
  }

  fetchEPIC (callback) {
    var p = this.p;
    var that = this;
    this.show_loader();

    p.loadImage('http://' + window.location.host + '/api/epic_image', function (img) {
      that.earth_img = img;
      that.hide_loader()
      callback()
    }, function (error) {
      console.log('error')
    })
  }

  show_loader () {
    $('body').append(
      '<div class="ui active dimmer"> <div class="ui text loader">Fetching from NASA</div> </div>'
    )
  }

  hide_loader () {
    $('.ui.active.dimmer').detach()
  }

  add_popup() {
    var text = this.meta.date.substring(0,16) + ' GMT | Captured by the NASA EPIC camera onboard the NOAA DSCOVR spacecraft'
    $('body').append(
      '<div class="ui circle" data-inverted="" style="position: absolute; height:'+this.size*0.8+'px; width: '+this.size*0.8+'px; top: 50%; left: 50%; margin: -'+this.size*0.8/2+'px 0 0 -'+this.size*0.8/2+'px; border-radius: 50%" data-tooltip="'+text+'" data-position="bottom center">'
    )
  }

}