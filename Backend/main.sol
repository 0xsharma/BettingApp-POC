// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract BettingContract{ 
    
    AggregatorV3Interface[] public aggregators = [AggregatorV3Interface(0x0715A7794a1dc8e42615F059dD6e406A6594651A),AggregatorV3Interface(0x007A22900a3B98143368Bd5906f8E17e9867581b), AggregatorV3Interface(0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046), AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada),
    AggregatorV3Interface(0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0), AggregatorV3Interface(0x92C09849638959196E976289418e5973CC96d645)];
    
    address public owner;
    uint public poolCounter;
    
    struct Pool{
        bool finalized;
        uint betSize;
        uint potSize;
        mapping(address => uint[]) registerToken;
        mapping (address => int) initialState;   
        address[] participants;
        address highestScorer;
        uint startTime;
        uint endTime;
        uint lockPeriod;
        mapping(address => bool) betPlaced;
    }
    
    mapping (uint => Pool) public pools;
    
    
    constructor() public {
        owner = msg.sender;
    }
    
    
    function createPool(uint _betSize, uint _duration) public onlyOwner{
        require(_betSize >= 1000000000000000000, "Min buyIn = 1 Matic");
        poolCounter += 1;
        pools[poolCounter].startTime = block.timestamp;
        pools[poolCounter].endTime = block.timestamp + _duration;
       pools[poolCounter].lockPeriod = 172800;
        pools[poolCounter].betSize = _betSize;
    }
    
    
    function buyIn(uint _poolId, uint[] memory _tokens) public payable {
        require(pools[_poolId].lockPeriod > block.timestamp, "buyIn closed");
        require(pools[_poolId].endTime > block.timestamp, "pool not open");
        require(msg.value == pools[_poolId].betSize, "Insufficient amount");
        require(pools[_poolId].betPlaced[msg.sender] == false, "Bet already placed");
        require(_tokens.length == 3, "Only 3 tokens allowed");
        require(pools[_poolId].participants.length < 5, "Max participants");
        
        pools[_poolId].potSize += msg.value;
        pools[_poolId].participants.push(msg.sender);
        pools[_poolId].registerToken[msg.sender] = _tokens;
        
        int total = 0;
        for (uint i = 0 ; i < 3 ; i++){
            int price = getThePrice(_tokens[i]);
            total += price;
            
        }
        
        pools[_poolId].initialState[msg.sender] = total;
        pools[_poolId].betPlaced[msg.sender] = true;
    }
    
    
    function finalize(uint _poolId) public {
        require(pools[_poolId].finalized == false, "Already finalized");
        require(pools[_poolId].lockPeriod < block.timestamp, "buyIn open");
        require(pools[_poolId].endTime < block.timestamp, "Pool open");
        require(pools[_poolId].potSize > 0, "Pool empty");
        int highestPercentage = -100;
        address winner = address(0x0);
        
        for(uint i=0; i<pools[_poolId].participants.length; i++){
            
            int total = 0;
            for (uint j = 0 ; j < 3 ; j++){
                int price = getThePrice(pools[_poolId].registerToken[pools[_poolId].participants[i]][j]);
                total += price;
            }
            
            int difference = total - pools[_poolId].initialState[pools[_poolId].participants[i]];
            int change = difference * 100 / pools[_poolId].initialState[pools[_poolId].participants[i]];
            
            if(change > highestPercentage){
                highestPercentage = change;
                winner = pools[_poolId].participants[i];
            }
        }
        payable(winner).transfer(pools[_poolId].potSize * 97 / 100);
        payable(owner).transfer(pools[_poolId].potSize * 3 / 100);
        pools[_poolId].highestScorer = winner;
    }
    
    
    function currentWinner(uint _poolId) public returns (address) {
        int highestPercentage = -100;
        address winner = address(0x0);
        
        for(uint i=0; i<pools[_poolId].participants.length; i++){
            
            int total = 0;
            for (uint j = 0 ; j < 3 ; j++){
                int price = getThePrice(pools[_poolId].registerToken[pools[_poolId].participants[i]][j]);
                total += price;
            }
            
            int difference = total - pools[_poolId].initialState[pools[_poolId].participants[i]];
            int change = difference * 100 / pools[_poolId].initialState[pools[_poolId].participants[i]];
            
            if(change > highestPercentage){
                highestPercentage = change;
                winner = pools[_poolId].participants[i];
            }
        }
        pools[_poolId].highestScorer = winner;
        return pools[_poolId].highestScorer;
    }
    
    
    
    modifier onlyOwner(){
        require(msg.sender == owner, "permission denied");
        _;
    }
    
    
    function getThePrice(uint256 index) public view returns (int) {
        (
            uint256 roundID, 
            int price,
            uint256 startedAt,
            uint256 timeStamp,
            uint256 answeredInRound
        ) = aggregators[index].latestRoundData();
        return price/1000000;
      }

      
    function getParticipants(uint _poolId) public view returns (address[] memory) {
        return pools[_poolId].participants;
    }
     
    
    receive() external payable {
        
    }
      
}
