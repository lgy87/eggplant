import { factory, Mode, Modes } from "./index"

describe("mode", () => {
  describe("production", () => {
    let mode: Mode

    beforeAll(() => {
      const process = ({
        env: {
          NODE_ENV: Modes.prod,
        },
      } as unknown) as NodeJS.Process

      mode = factory(process)
    })

    it("能够获取当前的所处的 mode 环境", async () => {
      expect(mode.current).toBe(Modes.prod)
    })
    it("能够判断当前是否处于设置的环境", () => {
      expect(mode.isProd).toBeTruthy()
      expect(mode.isDev).toBeFalsy()
      expect(mode.isTest).toBeFalsy()
      expect(mode.isNotProd).toBeFalsy()
      expect(mode.isNotDev).toBeTruthy()
      expect(mode.isNotTest).toBeTruthy()
    })
  })

  describe("development", () => {
    let mode: Mode

    beforeAll(() => {
      const process = ({
        env: {
          NODE_ENV: Modes.dev,
        },
      } as unknown) as NodeJS.Process
      mode = factory(process)
    })

    it("能够获取当前的所处的 mode 环境", () => {
      expect(mode.current).toBe(Modes.dev)
    })

    it("能够判断当前是否处于设置的环境", () => {
      expect(mode.isProd).toBeFalsy()
      expect(mode.isDev).toBeTruthy()
      expect(mode.isTest).toBeFalsy()
      expect(mode.isNotProd).toBeTruthy()
      expect(mode.isNotDev).toBeFalsy()
      expect(mode.isNotTest).toBeTruthy()
    })
  })

  describe("test", () => {
    let mode: Mode

    beforeAll(() => {
      const process = ({
        env: {
          NODE_ENV: Modes.test,
        },
      } as unknown) as NodeJS.Process
      mode = factory(process)
    })

    it("能够获取当前的所处的 mode 环境", () => {
      expect(mode.current).toBe(Modes.test)
    })

    it("能够判断当前是否处于设置的环境", () => {
      expect(mode.isProd).toBeFalsy()
      expect(mode.isDev).toBeFalsy()
      expect(mode.isTest).toBeTruthy()
      expect(mode.isNotProd).toBeTruthy()
      expect(mode.isNotDev).toBeTruthy()
      expect(mode.isNotTest).toBeFalsy()
    })
  })
})
