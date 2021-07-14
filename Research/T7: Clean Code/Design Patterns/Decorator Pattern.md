# Decorator Pattern

## Official Definition
`Decorator Pattern` attaches additional responsibilities to component, it provides flexible alternaty to subclassing while extending functionality

## Why do we need this Pattern? What does it try to solve

Normally, subclass inheritance will not help us on code sharing, it only gives us a hierarchy, yes, sometimes it splits our code into reasonable smaller chunks and each chunk will only need to do very specific things there, however, it could easily lead to a class explotion like below: 

![Class Diagram](./assets/Decorator_Pattern_Problem_Diagram.png)

Base products with different add-on selections can be a different product with distinct cost, they will also need to extend from the base class, for example, user would like a Decaf with SoyMilk and HotChocolate, which we will need a new class like `DecafMilkHotChoc` to extend from base class. So each concrete class would actually be a base flavor or an addon, that will create a mess for us when we have tons of new base products and add-on mixing together. Then, we might have an temp solution which can do a split of flavor and add-on for us:

![Class Diagram](./assets/Decorator_Pattern_Intermidiant.png)

This way we make each addon a property within the Beverage Base Class to control it while user wants to order, and it would be easier for us to calculate cost later. We have to admit that this works in a small scale of flavors and add-on, however, when add-on gets more, the Beverage class starts to grow larger, more importantly, base products like `Tea` or `Lemonade` **DO NOT** actually need add-on like Milk, Camal or Chocolate, so we are forcing those product classes to have  unnecessary properties since it is built into the base class. And this is not good enough.

`Decorator Pattern` can provide us a new strategy to resolve the problem in this case.

![Class Diagram](assets/Decorator_Pattern_Solution.png)

Define two groups of classes:
1. Base Product Class: Decaf, Espresso, Lemonade, Tea, Moka...
2. Addon Class: SoyMilk, Carmal, Hot Choc...

The `AddonDecorator` is still a `Beverage` from above UML diagram, and it will has a `Beverage` instance so it can calculate the cost and display the description based on it.

To implement `cost()` function:
1. for Base Product Class, we can simply do:
    ```javascript
    class Decaf extends Beverage {
      cost() {
        return 1;
       }
    }
    ```
2. for Addon Class, since it contains an instance from `Beverage` class, we can do:
    ```javascript
    class Caramel extends AddonDecorator {
      Beverage beverage;
      constructor(Beverage bvg) {
        this.beverage = bvg;
      }
      cost() {
        return this.beverage.cost() + 2;
      }
    }
    ```
    Once we have more than one wrap of class, for example, user wants SoyMilk and Caramel both add into a Espresso, what our decorator pattern can do is to wrap Espresso with SoyMilk and then wrap it with Caramel. It means that while calculating the cost, we are actually using recursion to drill down to the lowest level Beverage, which must be a real product like Decaf or Espresson and then calculate the cost back up to the up most AddonDecorator.

3. for Beverage Abstract Class or AddonDecorator Abstract Class:
    ```javascript
    abstract class Beverage {
       public abstract cost();
    }
    ```

    ```javascript
    abstract class AddonDecorator extends Beverage {
       public abstract cost();
    }
    ```
While using it, we can do something like below:
```javascript
  // to create a Decaf with SoyMilk and Caramel
  Beverage b = new Caramel(new SoyMilk(new Decaf()));
  b.cost(); // will return the final cost
```
## Thoughts on Decorator Pattern

Actually, above example might not be really suitable for Decorator, it's kind of over-engineering on this example because the `cost()` method there is really simple (probably for all of the AddonDecortor concrete classes they will have almost same implementation). This means, instead of having AddonDecorator extends from Beverage Class, we can have a list of AddonDecorator as dependency directly injected into Beverage Class constructor, and while calculating cost, we can just iterate through the list of AddonDecorators to come with the final cost.

I'd say if the shared methods(`cost()` method in above case) are complicated enough and have different implementation from each other, it could be a great example to use Decorator Pattern.