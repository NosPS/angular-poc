import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root',
})
export class ThreeService {
  public THREE = THREE;
  constructor() {}
}
