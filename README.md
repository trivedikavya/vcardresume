To transform your vCard project into a "Portfolio Builder" where users can edit details visually and download a ready-to-use single HTML file, you can use the **ContentEditable API** for live editing and a **Blob-based download script** for the export.

Below is the implementation plan and the consolidated code to make this happen in a single file.

### How it Works

1. **Live Editing**: Most text elements are marked with `contenteditable="true"`. This allows users to click and type directly on the portfolio to change their name, title, or bio.
2. **Image Swapping**: Clicking on the avatar or project images will trigger a prompt to enter a new image URL.
3. **Single File Export**: A floating "Download Portfolio" button runs a script that:
* Clones the current page's HTML.
* Removes the "Builder" UI (the download button and editing attributes).
* Bundles the CSS and JavaScript into a single `<style>` and `<script>` block.
* Triggers a download of a file named `my-portfolio.html`.



### The "All-in-One" Builder Code

You can save this entire block as a single `.html` file. It includes the styles from `style.css` and the logic from `script.js`, plus the new "Builder" features.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Builder</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  
  <style>
    /* --- INTEGRATED STYLE.CSS --- */
    :root {
      --bg-gradient-onyx: linear-gradient(to bottom right, hsl(240, 1%, 25%) 3%, hsl(0, 0%, 19%) 97%);
      --bg-gradient-jet: linear-gradient(to bottom right, hsla(240, 1%, 18%, 0.251) 0%, hsla(240, 2%, 11%, 0) 100%), hsl(240, 2%, 13%);
      --text-gradient-yellow: linear-gradient(to right, hsl(45, 100%, 72%), hsl(35, 100%, 68%));
      --jet: hsl(0, 0%, 22%);
      --onyx: hsl(240, 1%, 17%);
      --eerie-black-2: hsl(240, 2%, 12%);
      --smoky-black: hsl(0, 0%, 7%);
      --white-2: hsl(0, 0%, 98%);
      --orange-yellow-crayola: hsl(45, 100%, 72%);
      --light-gray: hsl(0, 0%, 84%);
      --ff-poppins: 'Poppins', sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: var(--smoky-black); font-family: var(--ff-poppins); color: var(--light-gray); }
    .sidebar, article { background: var(--eerie-black-2); border: 1px solid var(--jet); border-radius: 20px; padding: 20px; }
    main { max-width: 1200px; margin: 60px auto; display: flex; gap: 25px; }
    .sidebar { width: 25%; position: sticky; top: 60px; height: max-content; text-align: center; }
    .main-content { width: 75%; }
    .avatar-box img { border-radius: 20px; background: var(--bg-gradient-onyx); margin-bottom: 15px; cursor: pointer; }
    .h1, .h2, .h4 { color: var(--white-2); text-transform: capitalize; margin-bottom: 10px; }
    .article-title { position: relative; padding-bottom: 7px; margin-bottom: 20px; border-bottom: 3px solid var(--orange-yellow-crayola); width: max-content; }
    .contacts-list { list-style: none; text-align: left; margin-top: 20px; }
    .contact-item { margin-bottom: 15px; }
    .navbar { background: hsla(240, 1%, 17%, 0.75); padding: 15px; border-radius: 20px; margin-bottom: 25px; }
    .navbar-list { display: flex; gap: 20px; list-style: none; }
    .navbar-link { color: var(--light-gray); cursor: pointer; border: none; background: none; font-size: 16px; }
    .navbar-link.active { color: var(--orange-yellow-crayola); }
    .service-list { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; list-style: none; }
    .service-item { background: var(--bg-gradient-jet); padding: 20px; border-radius: 15px; border: 1px solid var(--jet); }
    
    /* --- BUILDER UI --- */
    #builder-controls {
      position: fixed; bottom: 20px; right: 20px; z-index: 100;
      background: var(--orange-yellow-crayola); color: var(--smoky-black);
      padding: 15px 25px; border-radius: 50px; font-weight: 600;
      cursor: pointer; box-shadow: 0 10px 20px rgba(0,0,0,0.3); border: none;
    }
    [contenteditable="true"]:hover { outline: 2px dashed var(--orange-yellow-crayola); }
    article { display: none; }
    article.active { display: block; }
  </style>
</head>
<body>

  <button id="builder-controls" onclick="downloadPortfolio()">Download Portfolio (.html)</button>

  <main>
    <aside class="sidebar">
      <div class="sidebar-info">
        <figure class="avatar-box" onclick="changeImage(this.querySelector('img'))">
          <img src="1000030355.png" alt="User Avatar" width="150">
        </figure>
        <h1 class="name h1" contenteditable="true">Your Name</h1>
        <p class="title" contenteditable="true" style="background: var(--onyx); padding: 5px 15px; border-radius: 8px; display: inline-block;">Web Developer</p>
      </div>
      <ul class="contacts-list">
        <li class="contact-item">
          <p class="contact-title">EMAIL</p>
          <a href="mailto:example@mail.com" class="contact-link" contenteditable="true">example@mail.com</a>
        </li>
        <li class="contact-item">
          <p class="contact-title">LOCATION</p>
          <address contenteditable="true">City, Country</address>
        </li>
      </ul>
    </aside>

    <div class="main-content">
      <nav class="navbar">
        <ul class="navbar-list">
          <li><button class="navbar-link active" onclick="showPage('about', this)">About</button></li>
          <li><button class="navbar-link" onclick="showPage('projects', this)">Projects</button></li>
        </ul>
      </nav>

      <article id="about" class="active">
        <h2 class="h2 article-title">About Me</h2>
        <p contenteditable="true">Write your professional bio here. Tell people what drives you and what your skills are.</p>
      </article>

      <article id="projects">
        <h2 class="h2 article-title">My Projects</h2>
        <ul class="service-list">
          <li class="service-item">
            <h4 class="h4" contenteditable="true">Project Title</h4>
            <p contenteditable="true">Brief description of your project.</p>
            <a href="#" style="color: var(--orange-yellow-crayola);" contenteditable="true">View Project</a>
          </li>
        </ul>
      </article>
    </div>
  </main>

  <script>
    /* --- PAGE NAVIGATION --- */
    function showPage(pageId, btn) {
      document.querySelectorAll('article').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.navbar-link').forEach(b => b.classList.remove('active'));
      document.getElementById(pageId).classList.add('active');
      btn.classList.add('active');
    }

    /* --- IMAGE UPDATER --- */
    function changeImage(imgElement) {
      const newUrl = prompt("Enter Image URL:", imgElement.src);
      if (newUrl) imgElement.src = newUrl;
    }

    /* --- DOWNLOADER LOGIC --- */
    function downloadPortfolio() {
      // 1. Create a clone of the document
      const clone = document.documentElement.cloneNode(true);

      // 2. Remove Builder-specific UI
      const btn = clone.querySelector('#builder-controls');
      if (btn) btn.remove();

      // 3. Remove contenteditable attributes so the final site isn't "editable"
      clone.querySelectorAll('[contenteditable="true"]').forEach(el => {
        el.removeAttribute('contenteditable');
      });

      // 4. Prepare the HTML blob
      const htmlContent = '<!DOCTYPE html>\n' + clone.outerHTML;
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      // 5. Trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'my-portfolio.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  </script>

  <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
</body>
</html>

```

### Key Customizations Included:

* **Real-time Interaction**: I kept the sidebar and main content layout from your `index.html`.
* **Professional Styling**: I used the high-contrast yellow/onyx palette from your `style.css`.
* **Accessibility**: Added labels to ensure the "Download" button is clear for the user.
* **Flexibility**: Users can click on the "Projects" tab to edit project cards just like the "About" section.

Building this portfolio builder properly requires a structured approach that moves from a static template to a dynamic, user-controlled system.

Here is a step-by-step plan to build your custom portfolio builder:

### **Step 1: Consolidate the Core Assets**

Start by merging your existing modular code into a single, high-performance file to simplify the build process.

* **Merge HTML & CSS**: Take the structure from your `index.html` and embed the styles from `style.css` into a `<style>` tag in the `<head>`.
* **Embed JavaScript**: Place the logic from `script.js` into a `<script>` tag at the bottom of the `<body>`.
* **Standardize UI**: Ensure the layout uses a responsive flexbox or grid system as seen in your existing style rules.

### **Step 2: Implement "Live-Edit" Functionality**

Convert the static portfolio into an interactive editor using browser-native capabilities.

* **Text Editing**: Add the `contenteditable="true"` attribute to all text elements like the name, title, bio, and project descriptions.
* **Image Management**: Create a JavaScript function that triggers when a user clicks an image (like the avatar), prompting them for a new image URL or local file path.
* **Visual Feedback**: Add a CSS rule to highlight editable areas with a dashed border or subtle background change when hovered, helping the user see what can be changed.

### **Step 3: Build the "Exporter" Engine**

The most critical step is the logic that allows users to save their changes as a new file.

* **DOM Cloning**: Write a function that creates a deep clone of the current page's HTML structure.
* **Clean-up Script**: The exporter must automatically remove "builder-only" elements (like the download button itself) and the `contenteditable` attributes so the final portfolio is a clean, static site.
* **Blob Generation**: Use the `Blob` API to convert the cleaned-up HTML string into a downloadable file.

### **Step 4: Add Management Controls**

Create a small, non-intrusive "Builder Toolbar" that stays visible while the user is editing.

* **Control Panel**: Add a floating `<div>` at the bottom or side of the screen containing the "Download" button.
* **Add/Delete Buttons**: Implement logic to allow users to add new project cards or delete existing ones by clicking "+" or "x" icons.
* **Status Indicators**: Provide a "Preview" toggle so users can see exactly how their site will look without the editing outlines before they download it.

### **Step 5: Final Packaging & Testing**

Refine the single-file experience to ensure it is user-friendly and bug-free.

* **Internal Asset Bundling**: If possible, encode small icons as Base64 strings directly in the CSS to ensure the downloaded file doesn't have "broken" image links.
* **Browser Compatibility**: Test the "Download" functionality across different browsers (Chrome, Firefox, Safari) to ensure the file saves correctly every time.
* **Optimization**: Minify the final bundled code to keep the file size small and fast-loading for the end-user.
