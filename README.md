# JavaScript: ECMAScript 2015+ – Gallery Slider Refactor

### See the live version of ECMAScript Gallery Slider

This project is part of my learning path with the mentor program at devmentor.pl. The goal was to refactor a legacy image slider by applying modern JavaScript standards (ES6+), modular structure, and proper code separation.


## 🔄 Project Overview
The original slider was functional but built with older JavaScript syntax and global functions. My job was to rebuild it into a clean, maintainable class-based module, making full use of ECMAScript 2015+ features such as:

• class and constructor
• arrow functions
• destructuring
• default parameters
• spread/rest syntax
• module exports/imports

The new structure allows for easier debugging, maintenance, and further scalability.

## 🧱 Key Concepts Applied
### 🧩 Class-Based Architecture
The core logic now lives in a single class:
```
import JSSlider from './modules/JSSlider';

const jsSlider = new JSSlider('.gallery__item');
jsSlider.run();
```

This class encapsulates all behaviors, internal state, and DOM interactions, following the Single Responsibility Principle.


![](./assets/img/img1.png)


## 🔌 Modular Code with Webpack
To ensure browser compatibility (for all major browsers post-2016 with >1% market share), the entire project is bundled with Webpack.

Webpack handles:

ES6+ transpilation via Babel

Module bundling

Static file serving (images/CSS) during development
```
// webpack.config.js
module.exports = {
    // ...
    devServer: {
        static: './',
    },
}
```

&nbsp;


## 🔁 Custom Events Integration
Just like the original implementation, the refactored version relies on a custom event system for interactivity:

js-slider-img-click

js-slider-img-next

js-slider-img-prev

js-slider-close

js-slider-start (NEW)

js-slider-stop (NEW)

These events promote decoupling, make debugging easier, and are useful for future event-based integrations.

## 🧠 Internal Features & Improvements
Grouped images by dynamic data-slider-group-name

Navigation with arrow buttons (looped cycling supported)

Automatic slideshow start/stop on hover events

Internal this.imagesList property shared across methods (instead of parameter passing)

## 🚀 Additional Functionality
Task 1 – Property-based Internal State
Instead of passing DOM elements to every method, key variables like image lists and current indexes are stored directly in the class instance (e.g. this.imagesList, this.currentGroup).

Task 2 – Auto Slideshow with Event Control
Introduced two new custom events:

• js-slider-start: triggers slideshow autoplay after clicking an image or leaving arrow hover

• js-slider-stop: pauses slideshow when hovering over arrows

Edge cases (like multiple hover entries or restarts) were handled with timers and flags.


&nbsp;


## 💡 Technologies
<img src="https://skillicons.dev/icons?i=html,css,javascript,webpack,babel" /><br/>

&nbsp;

## 🔗 See also
If you're interested in JavaScript-based UI projects, check out my other project: [Excursions Order Panel](https://code-mike-code.github.io/excursions-order-panel/)

&nbsp;

## 💿 Installation
1. Clone the repository

2. Run npm install

3. Start development server:

```
npm start
```

&nbsp;

## 🏁 Summary

• This project gave me hands-on experience in:
• Refactoring real-world legacy code using modern JS
• Using Webpack and Babel for browser support
• Structuring scalable UI components with classes and modules
• Managing state and behavior using Custom Events
• Applying software engineering best practices like encapsulation, SRP, and DRY

&nbsp;

## 🙋‍♂️ Let’s Connect!
Got feedback, questions, or just want to talk about frontend stuff? I'm happy to hear from you!

&nbsp;

## 👏 Thanks / Credits
Special thanks to devmentor.pl for providing this real-world exercise and mentorship support.

&nbsp;
