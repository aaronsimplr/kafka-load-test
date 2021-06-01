/**
 * This class will handle the logic of multiply and divide.
 * @exports ExampleService
 */
export class ExampleService {
  /**
   * This function will multiply x and y.
   *
   * @param x number The first number to multiply
   * @param y number The second number to multiply
   * @returns number
   */
  static multiply(x: number, y: number): number {
    return x * y;
  }

  /**
   * This function will divide x by y. y can not
   * be zero
   *
   * @param x number The first number to multiply
   * @param y number The second number to multiply
   * @returns number
   * @throws Error Divide by zero
   */
  static divide(x: number, y: number): number {
    if (y === 0) {
      throw new Error('Divide by zero error');
    }
    return x / y;
  }
}
