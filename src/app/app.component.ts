import { Component } from '@angular/core';
import { Feature } from 'ol';
import { Map, View } from "ol";
import { Point } from 'ol/geom';
import { Tile as TileLayer } from "ol/layer";
import VectorLayer from 'ol/layer/Vector';
import { transform } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import { XYZ } from "ol/source";
import VectorSource from 'ol/source/Vector';
import proj4 from 'proj4';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ol65';

  constructor() {
    proj4.defs("EPSG:22033", 'PROJCS["Camacupa_UTM_zone_33S",GEOGCS["GCS_Camacupa",DATUM["D_Camacupa",SPHEROID["Clarke_1880_RGS",6378249.145,293.465]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",15],PARAMETER["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",10000000],UNIT["Meter",1]]')
    register(proj4)
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

    const coordinates_22033 = [-57765, 9023905]
    const coordinates_4326 = transform(coordinates_22033, "EPSG:22033", "EPSG:4326")

    var feature = new Feature({
      geometry: new Point(coordinates_22033),
      name: 'My Point'
    });
    console.log(coordinates_22033)
    console.log(coordinates_4326)
    console.log(transform(coordinates_4326, "EPSG:4326", "EPSG:22033"))

    return [feature]
  }

}
