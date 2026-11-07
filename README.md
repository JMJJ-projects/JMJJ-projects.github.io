# jmjjprojects.com

Source of my portfolio: **[jmjjprojects.com](https://jmjjprojects.com)**, hosted on GitHub Pages.

A dependency-free static site (HTML, CSS, vanilla JS) with a responsive layout, an English/French toggle,
a light/dark toggle (defaults to the system setting), filterable project cards and per-project detail dialogs.
Visitors' choices are remembered; `?lang=fr` or `?lang=en` in the URL forces a language.

```
index.html                 page structure
assets/js/projects.js      all content in English: status line, projects, hardware (edit this to add a project)
assets/js/projects.fr.js   French versions of the project texts, keyed by project id
assets/js/i18n.js          French versions of the page text (keys match data-i18n in index.html)
assets/js/site.js          renders cards, filters and dialogs
assets/css/site.css        styles
projects/                  hosted extras (clustering notebook, Petri net report)
edumind/                   live demo of the EduMind prototype
Struggle/                  the STRUGGLE browser game
```

After changing CSS/JS, bump the `?v=` number on its link in `index.html` so phones fetch the new file.
To add a project, copy an entry in `assets/js/projects.js` (and add its French text in `projects.fr.js`), drop a 1200×700 image in
`assets/images/projects/`, and push.

Author: **John-Michael JENY JEYARAJ** · [GitHub](https://github.com/JMJJ-projects) · [LinkedIn](https://www.linkedin.com/in/jmjj/)
