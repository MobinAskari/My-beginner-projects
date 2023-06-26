import infos from './infos.js';

/* Actual results from the API to test the program without calling the API too many times */
/*
const infos = {
  "meals": [
      {
          "idMeal": "52776",
          "strMeal": "Chocolate Gateau",
          "strDrinkAlternate": null,
          "strCategory": "Dessert",
          "strArea": "French",
          "strInstructions": "Preheat the oven to 180°C/350°F/Gas Mark 4. Grease and line the base of an 8 in round spring form cake tin with baking parchment\r\nBreak the chocolate into a heatproof bowl and place over a saucepan of gently simmering water and stir until it melts. (or melt in the microwave for 2-3 mins stirring occasionally)\r\nPlace the butter and sugar in a mixing bowl and cream together with a wooden spoon until light and fluffy. Gradually beat in the eggs, adding a little flour if the mixture begins to curdle. Fold in the remaining flour with the cooled, melted chocolate and milk. Mix until smooth.\r\nSpread the mixture into the cake tin and bake for 50-55 mins or until firm in the centre and a skewer comes out cleanly. Cool for 10 minutes, then turn out and cool completely.",
          "strMealThumb": "https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg",
          "strTags": "Cake,Chocolate,Desert,Pudding",
          "strYoutube": "https://www.youtube.com/watch?v=dsJtgmAhFF4",
          "strIngredient1": "Plain chocolate",
          "strIngredient2": "Butter",
          "strIngredient3": "Milk",
          "strIngredient4": "Eggs",
          "strIngredient5": "Granulated Sugar",
          "strIngredient6": "Flour",
          "strIngredient7": "",
          "strIngredient8": "",
          "strIngredient9": "",
          "strIngredient10": "",
          "strIngredient11": "",
          "strIngredient12": "",
          "strIngredient13": "",
          "strIngredient14": "",
          "strIngredient15": "",
          "strIngredient16": null,
          "strIngredient17": null,
          "strIngredient18": null,
          "strIngredient19": null,
          "strIngredient20": null,
          "strMeasure1": "250g",
          "strMeasure2": "175g",
          "strMeasure3": "2 tablespoons",
          "strMeasure4": "5",
          "strMeasure5": "175g",
          "strMeasure6": "125g",
          "strMeasure7": "",
          "strMeasure8": "",
          "strMeasure9": "",
          "strMeasure10": "",
          "strMeasure11": "",
          "strMeasure12": "",
          "strMeasure13": "",
          "strMeasure14": "",
          "strMeasure15": "",
          "strMeasure16": null,
          "strMeasure17": null,
          "strMeasure18": null,
          "strMeasure19": null,
          "strMeasure20": null,
          "strSource": "http://www.goodtoknow.co.uk/recipes/536028/chocolate-gateau",
          "strImageSource": null,
          "strCreativeCommonsConfirmed": null,
          "dateModified": null
      },
      {
          "idMeal": "52905",
          "strMeal": "Chocolate Souffle",
          "strDrinkAlternate": null,
          "strCategory": "Dessert",
          "strArea": "French",
          "strInstructions": "Heat oven to 220C/fan 200C/gas 7 and place a baking tray on the top shelf. For the sauce, heat the cream and sugar until boiling. Remove from the heat, stir in the chocolate and butter until melted, then keep warm.\r\nBrush 6 x 150ml ramekins with melted butter, sprinkle with the 2 tbsp caster sugar, then tip out any excess. Melt the chocolate and cream in a bowl over a pan of simmering water, cool, then mix in the egg yolks. Whisk the egg whites until they hold their shape, then add the sugar, 1 tbsp at a time, whisking back to the same consistency. Mix a spoonful into the chocolate, then gently fold in the rest.\r\nWorking quickly, fill the ramekins, wipe the rims clean and run your thumb around the edges. Turn oven down to 200C/fan 180C/gas 6, place the ramekins onto the baking tray, then bake for 8-10 mins until risen with a slight wobble. Don’t open the oven door too early as this may make them collapse.\r\nOnce the soufflés are ready, dust with icing sugar, scoop a small hole from their tops, then pour in some of the hot chocolate sauce. Replace the lids and serve straight away.",
          "strMealThumb": "https://www.themealdb.com/images/media/meals/twspvx1511784937.jpg",
          "strTags": "DinnerParty,Desert,Pudding,Chocolate",
          "strYoutube": "https://www.youtube.com/watch?v=FWqfkUEWOTg",
          "strIngredient1": "Single Cream",
          "strIngredient2": "Caster Sugar",
          "strIngredient3": "Dark Chocolate",
          "strIngredient4": "Butter",
          "strIngredient5": "Butter",
          "strIngredient6": "Caster Sugar",
          "strIngredient7": "Dark Chocolate",
          "strIngredient8": "Double Cream",
          "strIngredient9": "Egg Yolks",
          "strIngredient10": "Egg White",
          "strIngredient11": "Double Cream",
          "strIngredient12": "Icing Sugar",
          "strIngredient13": "",
          "strIngredient14": "",
          "strIngredient15": "",
          "strIngredient16": "",
          "strIngredient17": "",
          "strIngredient18": "",
          "strIngredient19": "",
          "strIngredient20": "",
          "strMeasure1": "142ml",
          "strMeasure2": "25g",
          "strMeasure3": "100g ",
          "strMeasure4": "25g",
          "strMeasure5": "drizzle",
          "strMeasure6": "50g",
          "strMeasure7": "175g",
          "strMeasure8": "2 tbs",
          "strMeasure9": "4",
          "strMeasure10": "5",
          "strMeasure11": "2 tbs",
          "strMeasure12": "to serve",
          "strMeasure13": "",
          "strMeasure14": "",
          "strMeasure15": "",
          "strMeasure16": "",
          "strMeasure17": "",
          "strMeasure18": "",
          "strMeasure19": "",
          "strMeasure20": "",
          "strSource": "https://www.bbcgoodfood.com/recipes/5816/hot-chocolate-souffls-with-chocolate-cream-sauce",
          "strImageSource": null,
          "strCreativeCommonsConfirmed": null,
          "dateModified": null
      },
      {
          "idMeal": "52787",
          "strMeal": "Hot Chocolate Fudge",
          "strDrinkAlternate": null,
          "strCategory": "Dessert",
          "strArea": "American",
          "strInstructions": "Line an 8-inch-square baking pan with wax paper or foil, and coat with non-stick spray.\r\nIn a microwave-safe bowl, combine the dark chocolate chips, heavy cream and half of the sweetened condensed milk. Microwave the dark chocolate mixture in 20-second intervals, stirring in between each interval, until the chocolate is melted.\r\nAdd the vanilla extract to the dark chocolate mixture and stir well until smooth.\r\nTransfer the dark chocolate mixture into the prepared pan and spread into an even layer.\r\nIn a separate bowl, combine the white chocolate chips with the remaining half of the sweetened condensed milk. Microwave the white chocolate mixture in 20-second intervals, stirring in between each interval, until the chocolate is melted.\r\nEvenly spread the white chocolate mixture on top of dark chocolate layer.\r\nTop the chocolate layers with the Mallow Bits or miniature marshmallows, and gently press them down.\r\nRefrigerate for 4 hours, or until set.\r\nRemove the fudge and wax paper from the pan. Carefully peel all of the wax paper from the fudge.\r\nCut the fudge into bite-sized pieces and serve.",
          "strMealThumb": "https://www.themealdb.com/images/media/meals/xrysxr1483568462.jpg",
          "strTags": "Snack,Chocolate",
          "strYoutube": "https://www.youtube.com/watch?v=oJvbsVSblfk",
          "strIngredient1": "Chocolate Chips",
          "strIngredient2": "Heavy Cream",
          "strIngredient3": "Condensed Milk",
          "strIngredient4": "Vanilla Extract",
          "strIngredient5": "White Chocolate Chips",
          "strIngredient6": "Miniature Marshmallows",
          "strIngredient7": "",
          "strIngredient8": "",
          "strIngredient9": "",
          "strIngredient10": "",
          "strIngredient11": "",
          "strIngredient12": "",
          "strIngredient13": "",
          "strIngredient14": "",
          "strIngredient15": "",
          "strIngredient16": "",
          "strIngredient17": "",
          "strIngredient18": "",
          "strIngredient19": "",
          "strIngredient20": "",
          "strMeasure1": "2 cups",
          "strMeasure2": "2 tbs",
          "strMeasure3": "1 – 14-ounce can",
          "strMeasure4": "1 tsp",
          "strMeasure5": "1-⅓ cups",
          "strMeasure6": "1-½ cups",
          "strMeasure7": "",
          "strMeasure8": "",
          "strMeasure9": "",
          "strMeasure10": "",
          "strMeasure11": "",
          "strMeasure12": "",
          "strMeasure13": "",
          "strMeasure14": "",
          "strMeasure15": "",
          "strMeasure16": "",
          "strMeasure17": "",
          "strMeasure18": "",
          "strMeasure19": "",
          "strMeasure20": "",
          "strSource": "",
          "strImageSource": null,
          "strCreativeCommonsConfirmed": null,
          "dateModified": null
      },
      {
          "idMeal": "52794",
          "strMeal": "Vegan Chocolate Cake",
          "strDrinkAlternate": null,
          "strCategory": "Vegan",
          "strArea": "American",
          "strInstructions": "Simply mix all dry ingredients with wet ingredients and blend altogether. Bake for 45 min on 180 degrees. Decorate with some melted vegan chocolate ",
          "strMealThumb": "https://www.themealdb.com/images/media/meals/qxutws1486978099.jpg",
          "strTags": "Vegan,Chocolate,Cake",
          "strYoutube": "https://www.youtube.com/watch?v=C3pAgB7pync",
          "strIngredient1": "self raising flour",
          "strIngredient2": "coco sugar",
          "strIngredient3": "cacao",
          "strIngredient4": "baking powder",
          "strIngredient5": "flax eggs",
          "strIngredient6": "almond milk",
          "strIngredient7": "vanilla",
          "strIngredient8": "water",
          "strIngredient9": "",
          "strIngredient10": "",
          "strIngredient11": "",
          "strIngredient12": "",
          "strIngredient13": "",
          "strIngredient14": "",
          "strIngredient15": "",
          "strIngredient16": "",
          "strIngredient17": "",
          "strIngredient18": "",
          "strIngredient19": "",
          "strIngredient20": "",
          "strMeasure1": "1 1/4 cup",
          "strMeasure2": "1/2 cup",
          "strMeasure3": "1/3 cup raw",
          "strMeasure4": "1 tsp",
          "strMeasure5": "2",
          "strMeasure6": "1/2 cup",
          "strMeasure7": "1 tsp",
          "strMeasure8": "1/2 cup boiling",
          "strMeasure9": "",
          "strMeasure10": "",
          "strMeasure11": "",
          "strMeasure12": "",
          "strMeasure13": "",
          "strMeasure14": "",
          "strMeasure15": "",
          "strMeasure16": "",
          "strMeasure17": "",
          "strMeasure18": "",
          "strMeasure19": "",
          "strMeasure20": "",
          "strSource": "",
          "strImageSource": null,
          "strCreativeCommonsConfirmed": null,
          "dateModified": null
      },
      {
          "idMeal": "52853",
          "strMeal": "Chocolate Avocado Mousse",
          "strDrinkAlternate": null,
          "strCategory": "Dessert",
          "strArea": "British",
          "strInstructions": "1. Blend all the mousse ingredients together in your food processor until smooth. Add the cacao powder first and, as you blend, have all the ingredients to hand in order to adjust the ratios slightly as the size of avocados and bananas varies so much. The perfect ratio in order to avoid the dish tasting too much of either is to use equal amounts of both.\r\n\r\n2. Taste and add a few drops of stevia if you feel you need more sweetness.\r\n\r\n3. Fill little cups or shot glasses with the mousse, sprinkle with the cacao powder or nibs and serve.\r\n\r\nTip If you don’t have a frozen banana to hand you can just use a normal one and then chill the mousse before serving for a cooling dessert.",
          "strMealThumb": "https://www.themealdb.com/images/media/meals/uttuxy1511382180.jpg",
          "strTags": null,
          "strYoutube": "https://www.youtube.com/watch?v=wuZffe60q4M",
          "strIngredient1": "Banana",
          "strIngredient2": "Cacao",
          "strIngredient3": "Avocado",
          "strIngredient4": "Honey",
          "strIngredient5": "Lemon Juice",
          "strIngredient6": "Vanilla",
          "strIngredient7": "Water",
          "strIngredient8": "Sea Salt",
          "strIngredient9": "",
          "strIngredient10": "",
          "strIngredient11": "",
          "strIngredient12": "",
          "strIngredient13": "",
          "strIngredient14": "",
          "strIngredient15": "",
          "strIngredient16": "",
          "strIngredient17": "",
          "strIngredient18": "",
          "strIngredient19": "",
          "strIngredient20": "",
          "strMeasure1": "1",
          "strMeasure2": "3 tbsp",
          "strMeasure3": "1",
          "strMeasure4": "2 tblsp ",
          "strMeasure5": "1 tsp ",
          "strMeasure6": "1 tsp ",
          "strMeasure7": "2 tbsp",
          "strMeasure8": "pinch",
          "strMeasure9": "",
          "strMeasure10": "",
          "strMeasure11": "",
          "strMeasure12": "",
          "strMeasure13": "",
          "strMeasure14": "",
          "strMeasure15": "",
          "strMeasure16": "",
          "strMeasure17": "",
          "strMeasure18": "",
          "strMeasure19": "",
          "strMeasure20": "",
          "strSource": "http://www.hemsleyandhemsley.com/recipe/chocolate-avocado-mousse/",
          "strImageSource": null,
          "strCreativeCommonsConfirmed": null,
          "dateModified": null
      },
      {
          "idMeal": "52966",
          "strMeal": "Chocolate Caramel Crispy",
          "strDrinkAlternate": null,
          "strCategory": "Dessert",
          "strArea": "British",
          "strInstructions": "Grease and line a 20 x 20cm/8\" x 8\" baking tin with parchment paper.\r\nPut the mars bars and butter in a heat proof bowl and place over a pan of barely simmering water. Mixing with a whisk, melt until the mixture is smooth.\r\nPour over the rice krispies in a mixing bowl and mix until all the ingredients are evenly combined. Press evenly into the prepare baking tin and set aside.\r\nMelt the milk chocolate in the microwave or over a pan of barely simmering water.\r\nSpread the melted chocolate over the rice krispie mixture and leave to set in a cool place. Once set slice into squares and serve!",
          "strMealThumb": "https://www.themealdb.com/images/media/meals/1550442508.jpg",
          "strTags": "Sweet,Snack,Treat,Tart,Alcoholic,BBQ",
          "strYoutube": "https://www.youtube.com/watch?v=qsk_At_gjv0",
          "strIngredient1": "Mars Bar",
          "strIngredient2": "Butter",
          "strIngredient3": "Rice Krispies",
          "strIngredient4": "Milk Chocolate",
          "strIngredient5": "",
          "strIngredient6": "",
          "strIngredient7": "",
          "strIngredient8": "",
          "strIngredient9": "",
          "strIngredient10": "",
          "strIngredient11": "",
          "strIngredient12": "",
          "strIngredient13": "",
          "strIngredient14": "",
          "strIngredient15": "",
          "strIngredient16": "",
          "strIngredient17": "",
          "strIngredient18": "",
          "strIngredient19": "",
          "strIngredient20": "",
          "strMeasure1": "6 chopped",
          "strMeasure2": "150g",
          "strMeasure3": "120g",
          "strMeasure4": "150g",
          "strMeasure5": " ",
          "strMeasure6": " ",
          "strMeasure7": " ",
          "strMeasure8": " ",
          "strMeasure9": " ",
          "strMeasure10": " ",
          "strMeasure11": " ",
          "strMeasure12": " ",
          "strMeasure13": " ",
          "strMeasure14": " ",
          "strMeasure15": " ",
          "strMeasure16": " ",
          "strMeasure17": " ",
          "strMeasure18": " ",
          "strMeasure19": " ",
          "strMeasure20": " ",
          "strSource": "http://www.donalskehan.com/recipes/chocolate-caramel-rice-crispy-treats/",
          "strImageSource": null,
          "strCreativeCommonsConfirmed": null,
          "dateModified": null
      },
      {
          "idMeal": "52860",
          "strMeal": "Chocolate Raspberry Brownies",
          "strDrinkAlternate": null,
          "strCategory": "Dessert",
          "strArea": "American",
          "strInstructions": "Heat oven to 180C/160C fan/gas 4. Line a 20 x 30cm baking tray tin with baking parchment. Put the chocolate, butter and sugar in a pan and gently melt, stirring occasionally with a wooden spoon. Remove from the heat.\r\nStir the eggs, one by one, into the melted chocolate mixture. Sieve over the flour and cocoa, and stir in. Stir in half the raspberries, scrape into the tray, then scatter over the remaining raspberries. Bake on the middle shelf for 30 mins or, if you prefer a firmer texture, for 5 mins more. Cool before slicing into squares. Store in an airtight container for up to 3 days.",
          "strMealThumb": "https://www.themealdb.com/images/media/meals/yypvst1511386427.jpg",
          "strTags": "Chocolate,Desert,Snack",
          "strYoutube": "https://www.youtube.com/watch?v=Pi89PqsAaAg",
          "strIngredient1": "Dark Chocolate",
          "strIngredient2": "Milk Chocolate",
          "strIngredient3": "Salted Butter",
          "strIngredient4": "Light Brown Soft Sugar",
          "strIngredient5": "Eggs",
          "strIngredient6": "Plain Flour",
          "strIngredient7": "Cocoa",
          "strIngredient8": "Raspberries",
          "strIngredient9": "",
          "strIngredient10": "",
          "strIngredient11": "",
          "strIngredient12": "",
          "strIngredient13": "",
          "strIngredient14": "",
          "strIngredient15": "",
          "strIngredient16": "",
          "strIngredient17": "",
          "strIngredient18": "",
          "strIngredient19": "",
          "strIngredient20": "",
          "strMeasure1": "200g",
          "strMeasure2": "100g ",
          "strMeasure3": "250g",
          "strMeasure4": "400g",
          "strMeasure5": "4 large",
          "strMeasure6": "140g",
          "strMeasure7": "50g",
          "strMeasure8": "200g",
          "strMeasure9": "",
          "strMeasure10": "",
          "strMeasure11": "",
          "strMeasure12": "",
          "strMeasure13": "",
          "strMeasure14": "",
          "strMeasure15": "",
          "strMeasure16": "",
          "strMeasure17": "",
          "strMeasure18": "",
          "strMeasure19": "",
          "strMeasure20": "",
          "strSource": "https://www.bbcgoodfood.com/recipes/2121648/bestever-chocolate-raspberry-brownies",
          "strImageSource": null,
          "strCreativeCommonsConfirmed": null,
          "dateModified": null
      },
      {
          "idMeal": "52917",
          "strMeal": "White chocolate creme brulee",
          "strDrinkAlternate": null,
          "strCategory": "Dessert",
          "strArea": "French",
          "strInstructions": "Heat the cream, chocolate and vanilla pod in a pan until the chocolate has melted. Take off the heat and allow to infuse for 10 mins, scraping the pod seeds into the cream. If using the vanilla extract, add straight away. Heat oven to 160C/fan 140C/gas 3.\r\nBeat yolks and sugar until pale. stir in the chocolate cream. Strain into a jug and pour into ramekins. Place in a deep roasting tray and pour boiling water halfway up the sides. Bake for 15-20 mins until just set with a wobbly centre. Chill in the fridge for at least 4 hrs.\r\nTo serve, sprinkle some sugar on top of the brûlées and caramelise with a blowtorch or briefly under a hot grill. Leave caramel to harden, then serve.",
          "strMealThumb": "https://www.themealdb.com/images/media/meals/uryqru1511798039.jpg",
          "strTags": "Desert,DinnerParty,Pudding",
          "strYoutube": "https://www.youtube.com/watch?v=LmJ0lsPLHDc",
          "strIngredient1": "Double Cream",
          "strIngredient2": "White Chocolate Chips",
          "strIngredient3": "Vanilla",
          "strIngredient4": "Egg Yolks",
          "strIngredient5": "Caster Sugar",
          "strIngredient6": "Caster Sugar",
          "strIngredient7": "",
          "strIngredient8": "",
          "strIngredient9": "",
          "strIngredient10": "",
          "strIngredient11": "",
          "strIngredient12": "",
          "strIngredient13": "",
          "strIngredient14": "",
          "strIngredient15": "",
          "strIngredient16": "",
          "strIngredient17": "",
          "strIngredient18": "",
          "strIngredient19": "",
          "strIngredient20": "",
          "strMeasure1": "568ml",
          "strMeasure2": "100g ",
          "strMeasure3": "Pod of",
          "strMeasure4": "6",
          "strMeasure5": "2 tbs",
          "strMeasure6": "Top",
          "strMeasure7": "",
          "strMeasure8": "",
          "strMeasure9": "",
          "strMeasure10": "",
          "strMeasure11": "",
          "strMeasure12": "",
          "strMeasure13": "",
          "strMeasure14": "",
          "strMeasure15": "",
          "strMeasure16": "",
          "strMeasure17": "",
          "strMeasure18": "",
          "strMeasure19": "",
          "strMeasure20": "",
          "strSource": "https://www.bbcgoodfood.com/recipes/2540/white-chocolate-crme-brle",
          "strImageSource": null,
          "strCreativeCommonsConfirmed": null,
          "dateModified": null
      }
  ]
}
const randomMeal = {
  "meals": [
      {
          "idMeal": "52841",
          "strMeal": "Creamy Tomato Soup",
          "strDrinkAlternate": null,
          "strCategory": "Starter",
          "strArea": "British",
          "strInstructions": "Put the oil, onions, celery, carrots, potatoes and bay leaves in a big casserole dish, or two saucepans. Fry gently until the onions are softened – about 10-15 mins. Fill the kettle and boil it.\r\nStir in the tomato purée, sugar, vinegar, chopped tomatoes and passata, then crumble in the stock cubes. Add 1 litre boiling water and bring to a simmer. Cover and simmer for 15 mins until the potato is tender, then remove the bay leaves. Purée with a stick blender (or ladle into a blender in batches) until very smooth. Season to taste and add a pinch more sugar if it needs it. The soup can now be cooled and chilled for up to 2 days, or frozen for up to 3 months.\r\nTo serve, reheat the soup, stirring in the milk – try not to let it boil. Serve in small bowls with cheesy sausage rolls.",
          "strMealThumb": "https://www.themealdb.com/images/media/meals/stpuws1511191310.jpg",
          "strTags": "Baking",
          "strYoutube": "https://www.youtube.com/watch?v=lBhwjjUiFk4",
          "strIngredient1": "Olive Oil",
          "strIngredient2": "Onions",
          "strIngredient3": "Celery",
          "strIngredient4": "Carrots",
          "strIngredient5": "Potatoes",
          "strIngredient6": "Bay Leaf",
          "strIngredient7": "Tomato Puree",
          "strIngredient8": "Sugar",
          "strIngredient9": "White Vinegar",
          "strIngredient10": "Chopped Tomatoes",
          "strIngredient11": "Passata",
          "strIngredient12": "Vegetable Stock Cube",
          "strIngredient13": "Whole Milk",
          "strIngredient14": "",
          "strIngredient15": "",
          "strIngredient16": "",
          "strIngredient17": "",
          "strIngredient18": "",
          "strIngredient19": "",
          "strIngredient20": "",
          "strMeasure1": "3 tbsp",
          "strMeasure2": "2 chopped",
          "strMeasure3": "2 sticks",
          "strMeasure4": "300g",
          "strMeasure5": "500g",
          "strMeasure6": "4",
          "strMeasure7": "5 tblsp ",
          "strMeasure8": "2 tblsp ",
          "strMeasure9": "2 tblsp ",
          "strMeasure10": "1½ kg",
          "strMeasure11": "500g",
          "strMeasure12": "3",
          "strMeasure13": "400ml",
          "strMeasure14": "",
          "strMeasure15": "",
          "strMeasure16": "",
          "strMeasure17": "",
          "strMeasure18": "",
          "strMeasure19": "",
          "strMeasure20": "",
          "strSource": "https://www.bbcgoodfood.com/recipes/2604646/creamy-tomato-soup",
          "strImageSource": null,
          "strCreativeCommonsConfirmed": null,
          "dateModified": null
      }
  ]
}
*/

const mainContainer = document.querySelector('.main-container');

const mealsContainer = document.querySelector('.meals-container');


/* generate a random meal */
const generateRandomButton = document.querySelector('.generate-random');
generateRandomButton.addEventListener('click', () => {
  showRandomMeal(showParticularMeal);
});

async function showRandomMeal(callback) {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  const result = await data.json();
  callback(result);
}

/* Search meals */
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
searchButton.addEventListener('click', () => {
  searchMeal(searchInput.value, showMeals);
});

async function searchMeal(mealName, callback) {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
  const result = await data.json();
  callback(result, 'all');
}

/* Category buttons state management? */
const categoryButtons = document.querySelectorAll('.category');
categoryButtons.forEach(categoryBtn => {
  categoryBtn.addEventListener('click', () => {
    
    categoryButtons.forEach(catBtn => { 
      catBtn.classList.remove('active');
    });

    showMeals(infos ,`${categoryBtn.querySelector('p').innerText}`);
  });
});

/* Display a list of predefined meals from the infos.js */
showMeals(infos, 'all')
function showMeals(data, MealsCategory) {
  mealsContainer.innerHTML = ``;
  data.meals.forEach(meal => {
    // const aElement = document.createElement('a');
    // aElement.classList.add('.meal');
    if (MealsCategory === 'all') {
      mealsContainer.innerHTML += `
        <a href="#" class="meal" meal-id="${meal.idMeal}">
          <img src="${meal.strMealThumb}" alt="">
          <h4>${meal.strMeal}</h4>
          <p>${meal.strCategory}</p>
        </a>
      `;
    } 
    if (MealsCategory === meal.strCategory) {
      mealsContainer.innerHTML += `
        <a href="#" class="meal" meal-id="${meal.idMeal}">
          <img src="${meal.strMealThumb}" alt="">
          <h4>${meal.strMeal}</h4>
          <p>${meal.strCategory}</p>
        </a>
      `;
    } 
  });

  if (mealsContainer.innerHTML === '') {
    mealsContainer.innerHTML = `
      <h2 style="text-align:center;">Nothing was found :(</h2>
    `
  }
  getShownMeals(data);

  categoryButtons.forEach(btn => {
    const pEl = btn.querySelector('p').innerText;
    pEl == MealsCategory ? btn.classList.add('active') : ''
  });
}

/* get the already displayed meals and add an event listener, to show the particular meal if it's clicked */
function getShownMeals(data)  {
  const shownMeals = document.querySelectorAll('.meal');
  shownMeals.forEach((meal, index) => {
    meal.addEventListener('click', () => {
      showParticularMeal(data, meal.getAttribute('meal-id'));
    });
  });
}

/* shows the clicked meal along its info */ 
function showParticularMeal(data, id) {
  let meal; 
  data.meals.find(specificMeal => {
    specificMeal.idMeal == id ? meal = specificMeal : meal = data.meals[0]
  });
  mainContainer.classList.toggle('meal-shown');

  // Image Section
  const mealImageSection = document.createElement('section');
  mealImageSection.classList.add('meal-image-section');
  mealImageSection.innerHTML = `
    <button class="back-button">
      <span class="material-symbols-sharp">arrow_back</span>
    </button>
    <img src="${meal.strMealThumb}" alt="">
  `;
  
  // Info Section
  const mealInfoSection = document.createElement('section');
  mealInfoSection.classList.add('meal-info-section');
  mealInfoSection.innerHTML = `
  
    <div class="meal-primary-info">
      <div class="primary-info-wrapper">
        <div>
          <h3>${meal.strMeal}</h3>
          <h5></h5>
        </div>
        <div class="general-info"> 
          <div>
            <span class="material-symbols-sharp">category</span>
            <p>${meal.strCategory}</p>
          </div>
          <div>
            <span class="material-symbols-sharp">menu</span>
            <p>${meal.strDifficulty ? meal.strDifficulty : meal.strArea}</p>
          </div>
          <div>
            <span class="material-symbols-sharp">numbers</span>
            <p>${meal.strServes ? 'Serves: ' + meal.strServes : meal.idMeal}</p>
          </div>
        </div>
      </div>
      <div class="ratings">
        <span class="material-symbols-sharp">star</span>
        <p>${meal.strRating ? meal.strRating : 'No ratings'}</p>
      </div>
    </div>
    <div class="instruction-wrapper">
      <h3>Instructions</h3>
      <p>${meal.strInstructions}</p>
    </div>
  
  `;

  // Ingredients wrapper
  const ingredientsWrapperElement = document.createElement('div');
  ingredientsWrapperElement.classList.add('ingredients-wrapper');
  ingredientsWrapperElement.innerHTML = `<h3>Ingredients</h3>`;
  /* We have the ingredients/measures and their values stored as key-value pairs hence we have a hard coded for loop. */
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measures = meal[`strMeasure${i}`];
    ingredient ?
      ingredientsWrapperElement.innerHTML += `
        <div class="ingredinet-and-measures">
          <p>${ingredient}</p>
          <p>${measures}</p>
        </div>
      ` : '';
  }

  mainContainer.appendChild(mealImageSection);
  mainContainer.appendChild(mealInfoSection);
  mealInfoSection.appendChild(ingredientsWrapperElement);
    
  trackBackButton(mealImageSection, mealInfoSection);
}

/* Implements back button functionality */
function trackBackButton(mealImageSection, mealInfoSection) {
  document.querySelector('.back-button').addEventListener('click', () => {
    mainContainer.removeChild(mealImageSection);
    mainContainer.removeChild(mealInfoSection);
    mainContainer.classList.remove('meal-shown');
  });
}
