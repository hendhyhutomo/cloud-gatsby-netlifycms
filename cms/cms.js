import CMS from 'netlify-cms-app';
import ColorControl from './color/Controls';
import ColorPreview from './color/Preview';
import Youtube from './editor/Youtube';
// Cloudinary Media Library
import cloudinary from 'netlify-cms-media-library-cloudinary';

CMS.registerWidget('color', ColorControl, ColorPreview);

CMS.registerEditorComponent({
  // Internal id of the component
  id: 'youtube',
  // Visible label
  label: 'Youtube',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: 'youtubeid', label: 'Youtube Video ID', widget: 'string' },
    { name: 'autoplay', label: 'Autoplay', widget: 'boolean', default: false },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<Youtube youtubeId="(\S+)"\s*(?:autoPlay=\{(\S+)\}|\s*)\s*\/>$/,
  // Function to extract data elements from the regexp match
  fromBlock: function (match) {
    return {
      youtubeid: match[1],
      autoplay: match[2] === 'trueupda',
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj) {
    return `<Youtube youtubeId="${obj.youtubeid}" autoPlay={${obj.autoplay}} />`;
  },
  toPreview: function (obj) {
    return Youtube(obj);
  },
});
// REGISTER CLOUDINARY
CMS.registerMediaLibrary(cloudinary);
