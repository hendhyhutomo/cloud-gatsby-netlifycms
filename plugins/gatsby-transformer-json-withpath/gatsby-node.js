'use strict';

const _ = require(`lodash`);

const path = require(`path`);

const deepMap = require('deep-map');

const slash = require('slash');

exports.onCreateNode = async function (
  {
    node,
    getNode,
    actions,
    loadNodeContent,
    createNodeId,
    createContentDigest,
  },
  pluginOptions
) {
  // GET PLUGIN OPTIONS
  const makeRelative = pluginOptions.name || false;
  const directory = pluginOptions.directory || null;

  function getType({ node, object, isArray }) {
    if (pluginOptions && _.isFunction(pluginOptions.typeName)) {
      return pluginOptions.typeName({
        node,
        object,
        isArray,
      });
    } else if (pluginOptions && _.isString(pluginOptions.typeName)) {
      return pluginOptions.typeName;
    } else if (node.internal.type !== `File`) {
      return _.upperFirst(_.camelCase(`${node.internal.type} Json`));
    } else if (isArray) {
      return _.upperFirst(_.camelCase(`${node.name} Json`));
    } else {
      return _.upperFirst(_.camelCase(`${path.basename(node.dir)} Json`));
    }
  }

  function transformObject(obj, id, type) {
    const jsonNode = {
      ...obj,
      id,
      children: [],
      parent: node.id,
      // ADDED NEW NODE 
      absolutePath: node.absolutePath,
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
    };

    createNode(jsonNode);
    createParentChildLink({
      parent: node,
      child: jsonNode,
    });
    console.log('final node', jsonNode);
  }

  const { createNode, createParentChildLink } = actions; // We only care about JSON content.

  if (node.internal.mediaType !== `application/json`) {
    return;
  }

  const content = await loadNodeContent(node);
  let parsedContent;

  try {
    parsedContent = JSON.parse(content);
  } catch {
    const hint = node.absolutePath
      ? `file ${node.absolutePath}`
      : `in node ${node.id}`;
    throw new Error(`Unable to parse JSON: ${hint}`);
  }
  if (_.isArray(parsedContent)) {
    parsedContent.forEach((obj, i) => {
      transformObject(
        obj,
        obj.id ? String(obj.id) : createNodeId(`${node.id} [${i}] >>> JSON`),
        getType({
          node,
          object: obj,
          isArray: true,
        })
      );
    });
  } else if (_.isPlainObject(parsedContent)) {
    transformObject(
      parsedContent,
      parsedContent.id
        ? String(parsedContent.id)
        : createNodeId(`${node.id} >>> JSON`),
      getType({
        node,
        object: parsedContent,
        isArray: false,
      })
    );
  }
};

// exports.onCreateNode = onCreateNode;
