## 🚀 GATSBY TEMPLATE with NETLIFY CMS [Github]

### Specification

- Using Yarn as Package Manager
- Based on Gatsby Starter Template
- Gatsby Image (with relative image)
- Netlify CMS (Identity)
- Sass
- Transformer (JSON & MDX)
- Gatsby Plugin Transition Link
- Netlify Cache & Netlify Plugin (For Hosting in Netlify)
- Form Installed (to Formspree & Netlify)
- MDX Installed
- Lunr Search Integrated
- Enabled Editorial Workflow [Works with Netlify Identity]

### Additional Functions

1. URL ROUTER :link: [Added Support for non Netlify & S3 Hosting]
2. Added Netlify CMS Color Widget (Custom)
3. Added Youtbe Widget on Editor (with Autoplay Toggle)
4. Relative Transformer for JSON files

### Notes on Cloudinary

Integrated cloudinary with the following integration

1. Gatsby Transformer Cloudinary Plugin [Applied]
- Image is still hosted in local cdn / git, it will be uploaded during build time to cloudinary (removing the need for gatsby-trasnformer-sharp & gastby-plugin-sharp) potentially reducing build time in converting that image
- Netlify CMS setting should still be set as normal with standard Media Folder location.

2. Netlify CMS with Cloudinary Media Library
- Change *ALL* image upload to Cloudinary it will be exported back as URL to cloudinary
- Image transformation can be applied through URL setting in Clouinary [https://cloudinary.com/documentation/image_transformations]

### NetlifyCMS Access [Identity]

> USERNAME: hendhyhutomo@gmail.com
> PASSWORD: testing123

##### On Github & Gitlab

Gatsby Cloud Preview Server not Working with Netlify CMS & Identity
DEMO LINK [https://gastby-netlifycms-github.netlify.app/]

#### OTHER NOTES

- Netlify Large Media Clashes with Gatsby Build Transformers will only work if using Images as is
- NetlifyCMS is useless with Gatsby Cloud as it always deploy preview. Pottenntially Gatsby Cloud is good with other CMS like Strapi as it build preview.

---

##### On Github & Netlify [Sync to Gitlab]
##### LAST UPDATE 2 July 2020 by Hendhy Hutomo
