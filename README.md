# 📘 Assignment-005

This is my project submission for **Assignment-005**.  
I have implemented the required features using **HTML, CSS (Tailwind CSS), and Vanilla JavaScript**.

---

## ✨ Features
- Navbar with logo, heart icon, coin counter, and copy counter  
- Hero Section with background gradient, logo, title, and slogan  
- Emergency Hotline Cards with call and copy buttons  
- Call History Section with clear history button  
- Responsive design for mobile devices  
- Functionalities: Like (heart), Call (with coin deduction), Copy, and History tracking  

---

## 📝 Questions & Answers

### 1. What is the difference between `getElementById`, `getElementsByClassName`, and `querySelector` / `querySelectorAll`?

- **getElementById** → Selects a specific element using its `id`. Always returns a single element.  
- **getElementsByClassName** → Selects all elements with the same class name. Returns an **HTMLCollection** (array-like).  
- **querySelector** → Selects the first element that matches a **CSS selector**. Returns a single element.  
- **querySelectorAll** → Selects all elements that match a **CSS selector**. Returns a **NodeList**.  

---

### 2. How do you create and insert a new element into the DOM?

```javascript
// Create a new element
const newDiv = document.createElement("div");

// Add some content
newDiv.textContent = "Hello World!";

// Append to the DOM
document.body.appendChild(newDiv);
````

This way, we can create a new element and add it to the webpage.

---

### 3. What is Event Bubbling and how does it work?

Event Bubbling means when an event (e.g., `click`) occurs on an element, it first triggers on that element, then propagates upward → parent → grandparent → document.

**Example:**
If a button is inside a `div`, and both have click listeners, clicking the button will trigger events in this order:
`button → div → body → document`.

---

### 4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation means attaching an event listener to a **parent element** to handle events on its **child elements**.

✅ **Advantages:**

* No need to add separate listeners to each child.
* It works for dynamically added elements (added later to the DOM).

---

### 5. What is the difference between `preventDefault()` and `stopPropagation()` methods?

* **preventDefault()** → Stops the browser’s default behavior.
  Example: Prevent a form from reloading the page on submit.

* **stopPropagation()** → Stops the event from propagating (bubbling or capturing) to parent elements.

---

## 🚀 Technology Stack

* HTML
* CSS (**Tailwind CSS**)
* JavaScript (**Vanilla JS**)

```
