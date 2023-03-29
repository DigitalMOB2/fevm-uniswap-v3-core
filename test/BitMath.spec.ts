import { expect } from './shared/expect'
import { BitMathTest } from '../typechain/BitMathTest'
import { ethers } from 'hardhat'

const { BigNumber } = ethers

describe('BitMath', () => {
  let bitMath: BitMathTest
  const fixture = async () => {
    const factory = await ethers.getContractFactory('BitMathTest')
    return (await factory.deploy()) as BitMathTest
  }
  beforeEach('deploy BitMathTest', async () => {
    bitMath = await fixture()
  })

  describe('#mostSignificantBit', () => {
    it('2', async () => {
      expect(await bitMath.mostSignificantBit(2)).to.eq(1)
    })
    it('all powers of 2', async () => {
      const results = await Promise.all(
        [...Array(255)].map((_, i) => bitMath.mostSignificantBit(BigNumber.from(2).pow(i)))
      )
      expect(results).to.deep.eq([...Array(255)].map((_, i) => i))
    })
  })

  describe('#leastSignificantBit', () => {
    it('2', async () => {
      expect(await bitMath.leastSignificantBit(2)).to.eq(1)
    })
    it('all powers of 2', async () => {
      const results = await Promise.all(
        [...Array(255)].map((_, i) => bitMath.leastSignificantBit(BigNumber.from(2).pow(i)))
      )
      expect(results).to.deep.eq([...Array(255)].map((_, i) => i))
    })
  })
})
