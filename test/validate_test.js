/**
 * Created by Walter on 5/20/2016.
 */


describe("the character creator", function() {

   describe("create a player from web data", function(){

       it("should create a player based on website entered", function (){
           expect(createCharacter("Shopping").toBe("Berserker"));

       });
       it("should create a player based on website entered", function (){
           expect(createCharacter("Business").toBe("Thief"));

       });
       it("should create a player based on website entered", function (){
           expect(createCharacter("Health").toBe("Healer"));

       });
       it("should create a player based on website entered", function (){
           expect(createCharacter("Computers").toBe("Sorcerer"));

       });
       it("should create a player based on website entered", function (){
           expect(createCharacter("Home").toBe("Knight"));

       });
       it("should create a player based on website entered", function (){
           expect(createCharacter("Sports").toBe("Warrior"));

       });
   });
});