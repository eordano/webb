import { MVector3 } from './MVector3'

/**
 * A Curve3 object is a logical object, so not a mesh, to handle curves in the 3D geometric space.
 * A Curve3 is designed from a series of successive Vector3.
 * {@link https://doc.babylonjs.com/how_to/how_to_use_curve3 }
 * @public
 */
export class Curve3 {
  private _points: MVector3[]
  private _length: number = 0.0

  /**
   * A Curve3 object is a logical object, so not a mesh, to handle curves in the 3D geometric space.
   * A Curve3 is designed from a series of successive Vector3.
   * {@link http://doc.babylonjs.com/tutorials/How_to_use_Curve3#curve3-object | Tutorial }
   * @param points - points which make up the curve
   */
  constructor(points: MVector3[]) {
    this._points = points
    this._length = this._computeLength(points)
  }

  /**
   * Returns a Curve3 object along a Quadratic Bezier curve : http://doc.babylonjs.com/tutorials/How_to_use_Curve3#quadratic-bezier-curve
   * @param v0 - (Vector3) the origin point of the Quadratic Bezier
   * @param v1 - (Vector3) the control point
   * @param v2 - (Vector3) the end point of the Quadratic Bezier
   * @param nbPoints - (integer) the wanted number of points in the curve
   * @returns the created Curve3
   */
  public static CreateQuadraticBezier(v0: MVector3, v1: MVector3, v2: MVector3, nbPoints: number): Curve3 {
    // tslint:disable-next-line:no-parameter-reassignment
    nbPoints = nbPoints > 2 ? nbPoints : 3
    let bez = new Array<MVector3>()
    let equation = (t: number, val0: number, val1: number, val2: number) => {
      let res = (1.0 - t) * (1.0 - t) * val0 + 2.0 * t * (1.0 - t) * val1 + t * t * val2
      return res
    }
    for (let i = 0; i <= nbPoints; i++) {
      bez.push(
        new MVector3(
          equation(i / nbPoints, v0.x, v1.x, v2.x),
          equation(i / nbPoints, v0.y, v1.y, v2.y),
          equation(i / nbPoints, v0.z, v1.z, v2.z)
        )
      )
    }
    return new Curve3(bez)
  }

  /**
   * Returns a Curve3 object along a Cubic Bezier curve : http://doc.babylonjs.com/tutorials/How_to_use_Curve3#cubic-bezier-curve
   * @param v0 - (Vector3) the origin point of the Cubic Bezier
   * @param v1 - (Vector3) the first control point
   * @param v2 - (Vector3) the second control point
   * @param v3 - (Vector3) the end point of the Cubic Bezier
   * @param nbPoints - (integer) the wanted number of points in the curve
   * @returns the created Curve3
   */
  public static CreateCubicBezier(v0: MVector3, v1: MVector3, v2: MVector3, v3: MVector3, nbPoints: number): Curve3 {
    // tslint:disable-next-line:no-parameter-reassignment
    nbPoints = nbPoints > 3 ? nbPoints : 4
    let bez = new Array<MVector3>()
    let equation = (t: number, val0: number, val1: number, val2: number, val3: number) => {
      let res =
        (1.0 - t) * (1.0 - t) * (1.0 - t) * val0 +
        3.0 * t * (1.0 - t) * (1.0 - t) * val1 +
        3.0 * t * t * (1.0 - t) * val2 +
        t * t * t * val3
      return res
    }
    for (let i = 0; i <= nbPoints; i++) {
      bez.push(
        new MVector3(
          equation(i / nbPoints, v0.x, v1.x, v2.x, v3.x),
          equation(i / nbPoints, v0.y, v1.y, v2.y, v3.y),
          equation(i / nbPoints, v0.z, v1.z, v2.z, v3.z)
        )
      )
    }
    return new Curve3(bez)
  }

  /**
   * Returns a Curve3 object along a Hermite Spline curve : http://doc.babylonjs.com/tutorials/How_to_use_Curve3#hermite-spline
   * @param p1 - (Vector3) the origin point of the Hermite Spline
   * @param t1 - (Vector3) the tangent vector at the origin point
   * @param p2 - (Vector3) the end point of the Hermite Spline
   * @param t2 - (Vector3) the tangent vector at the end point
   * @param nbPoints - (integer) the wanted number of points in the curve
   * @returns the created Curve3
   */
  public static CreateHermiteSpline(p1: MVector3, t1: MVector3, p2: MVector3, t2: MVector3, nbPoints: number): Curve3 {
    let hermite = new Array<MVector3>()
    let step = 1.0 / nbPoints
    for (let i = 0; i <= nbPoints; i++) {
      hermite.push(MVector3.Hermite(p1, t1, p2, t2, i * step))
    }
    return new Curve3(hermite)
  }

  /**
   * Returns a Curve3 object along a CatmullRom Spline curve :
   * @param points - (array of Vector3) the points the spline must pass through. At least, four points required
   * @param nbPoints - (integer) the wanted number of points between each curve control points
   * @param closed - (boolean) optional with default false, when true forms a closed loop from the points
   * @returns the created Curve3
   */
  public static CreateCatmullRomSpline(points: MVector3[], nbPoints: number, closed?: boolean): Curve3 {
    let catmullRom = new Array<MVector3>()
    let step = 1.0 / nbPoints
    let amount = 0.0
    if (closed) {
      let pointsCount = points.length
      for (let i = 0; i < pointsCount; i++) {
        amount = 0
        for (let c = 0; c < nbPoints; c++) {
          catmullRom.push(
            MVector3.CatmullRom(
              points[i % pointsCount],
              points[(i + 1) % pointsCount],
              points[(i + 2) % pointsCount],
              points[(i + 3) % pointsCount],
              amount
            )
          )
          amount += step
        }
      }
      catmullRom.push(catmullRom[0])
    } else {
      let totalPoints = new Array<MVector3>()
      totalPoints.push(points[0].clone())
      Array.prototype.push.apply(totalPoints, points)
      totalPoints.push(points[points.length - 1].clone())
      let i = 0
      for (i = 0; i < totalPoints.length - 3; i++) {
        amount = 0
        for (let c = 0; c < nbPoints; c++) {
          catmullRom.push(
            MVector3.CatmullRom(totalPoints[i], totalPoints[i + 1], totalPoints[i + 2], totalPoints[i + 3], amount)
          )
          amount += step
        }
      }
      i--
      catmullRom.push(
        MVector3.CatmullRom(totalPoints[i], totalPoints[i + 1], totalPoints[i + 2], totalPoints[i + 3], amount)
      )
    }
    return new Curve3(catmullRom)
  }

  /**
   * @returns the Curve3 stored array of successive Vector3
   */
  public getPoints() {
    return this._points
  }

  /**
   * @returns the computed length (float) of the curve.
   */
  public length() {
    return this._length
  }

  /**
   * Returns a new instance of Curve3 object : var curve = curveA.continue(curveB);
   * This new Curve3 is built by translating and sticking the curveB at the end of the curveA.
   * curveA and curveB keep unchanged.
   * @param curve - the curve to continue from this curve
   * @returns the newly constructed curve
   */
  public continue(curve: Curve3): Curve3 {
    let lastPoint = this._points[this._points.length - 1]
    let continuedPoints = this._points.slice()
    let curvePoints = curve.getPoints()
    for (let i = 1; i < curvePoints.length; i++) {
      continuedPoints.push(curvePoints[i].subtract(curvePoints[0]).add(lastPoint))
    }
    let continuedCurve = new Curve3(continuedPoints)
    return continuedCurve
  }

  private _computeLength(path: MVector3[]): number {
    let l = 0
    for (let i = 1; i < path.length; i++) {
      l += path[i].subtract(path[i - 1]).length()
    }
    return l
  }
}
