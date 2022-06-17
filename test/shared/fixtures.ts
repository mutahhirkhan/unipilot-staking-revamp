import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { deployContract, Fixture } from "ethereum-waffle";
import { TestERC20 } from "../../typechain/TestERC20";
// import {}
import { waffle } from "hardhat";
import { UnipilotStaking } from "../../typechain/UnipilotStaking";

interface StakingFixture {
  staking: UnipilotStaking;
}
async function stakingFixture(): Promise<StakingFixture> {
  const stakingStaking = await ethers.getContractFactory("UnipilotStaking");
  const staking = (await stakingStaking.deploy()) as UnipilotStaking;
  return { staking };
}

interface TokensFixture {
    pilot: TestERC20
    WETH: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
    const tokenFactory = await ethers.getContractFactory('TestERC20')
    const pilot = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
    const WETH = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  
    return { pilot, WETH }
}
type TokensAndStakingFixture = StakingFixture & TokensFixture

export const stakingConfigFixture: Fixture<TokensAndStakingFixture> = async function(): Promise<TokensAndStakingFixture>  {
    const {staking} = await stakingFixture()
    const {pilot, WETH} = await tokensFixture()
    return {staking, pilot, WETH}
}