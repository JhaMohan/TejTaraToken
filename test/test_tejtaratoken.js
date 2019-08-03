const TejTaraToken =  artifacts.require("TejTaraToken")



contract("TejTaraToken",(accounts)=>{
  let tokenInstance;

  it("assign correct value",()=>{
   
        return TejTaraToken.deployed().then(instance=>{
            tokenInstance=instance;
        return tokenInstance.name(); 
        }).then(name=>{
            assert.equal(name,"TejTara Token","name has to be correct");
            return tokenInstance.symbol();
        }).then(symbol=>{
            assert.equal(symbol,"TejTara","symbol has to be correct");
            return tokenInstance.standard();
        }).then(standard=>{
            assert.equal(standard,"TejTara version 1.0","standard has to be correct");
        })
   });


   it("initial supply value",()=>{
       return TejTaraToken.deployed().then(instance=>{
           tokenInstance=instance;
         return tokenInstance.totalSupply();  
       }).then(totalSupply=>{
           assert.equal(totalSupply,1000000,"total token supply");
          return tokenInstance.balanceOf(accounts[0]); 
       }).then(balance=>{
           assert.equal(balance,1000000,"total token assign to admin");
       })
   });

  it("transerfer the ownership of the token",()=>{
       return TejTaraToken.deployed().then(instance=>{
         tokenInstance= instance;
         return tokenInstance.transfer(accounts[1],999999999999);            
       }).then(assert.fail).catch(error=>{
           assert(error.message.indexOf('revert')>=0,"revert haas to be fired");
          return tokenInstance.transfer(accounts[1],500000)
       }).then(receipt=>{
           return tokenInstance.balanceOf(accounts[0])
       }).then(balance=>{
           assert.equal(balance,500000,"Balance of admin");
           return tokenInstance.balanceOf(accounts[1])
       }).then(balance=>{
           assert.equal(balance,500000,"Balance of accounts1");
       }) 
  })




})