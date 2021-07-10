import { Component } from '@angular/core';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import VectorLayer from 'ol/layer/vector';
import XYZ from 'ol/source/xyz';
import VectorSource from 'ol/source/vector';
import Point from 'ol/geom/point';
import proj from 'ol/proj';
import Feature from 'ol/feature';
import proj4 from 'proj4';
import { Coordinate } from 'openlayers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ol65';

  constructor() {
    proj4.defs("EPSG:22033", 'PROJCS["Camacupa_UTM_zone_33S",GEOGCS["GCS_Camacupa",DATUM["D_Camacupa",SPHEROID["Clarke_1880_RGS",6378249.145,293.465]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",15],PARAMETER["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",10000000],UNIT["Meter",1]]')
    proj.setProj4(proj4)
  }

  ngOnInit() {
    const vl = new VectorLayer({ source: new VectorSource({ features: this.createFeature() }) })
    new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
        vl
      ],
      view: new View({
        projection: "EPSG:22033",
        center: [127583.44, 9191923.76],
        zoom: 6
      })
    });
  }

  createFeature() {

    const coordinates_4326: Coordinate = [11.373611449999999, -7.36326170000001]
    const coordinates_22033 = proj.transform(coordinates_4326, "EPSG:4326", "EPSG:22033")

    var feature = new Feature({
      geometry: new Point(coordinates_22033),
      name: 'My Point'
    });
    console.log("input", coordinates_4326)
    console.log("transformed", coordinates_22033)
    console.log("retransformed", proj.transform(coordinates_22033, "EPSG:22033", "EPSG:4326"))

    return [feature]
  }

}
