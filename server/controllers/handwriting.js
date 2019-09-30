const config = require('config');
const request = require('request');

const check = require('../check/handwriting');

const get_handwriting_id = async (req, res) => {
  const { id } = req.body;

  await request(
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      url: `https://${config.get('Key')}:${config.get(
        'Secret'
      )}@api.handwriting.io/handwritings/${id}`
    },
    async function(error, response) {
      try {
        console.log(response.caseless.dict['content-type']);
        const content = global._.split(
          response.caseless.dict['content-type'],
          ';'
        );
        if (content[0] === 'application/json') {
          return res.status(200).send(response.body);
        } else if (content[0] === 'application/json') {
          const json = JSON.parse(response.body);
          if (json.errors && json.errors[0]) {
            return res.status(429).json(json);
          }
        }
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  );
};

const get_handwriting = async (req, res) => {
  let { limit, offset, order_dir, order_by } = req.body;

  // check data
  if (!limit && !offset && !order_dir && !order_by) {
    //default settings
    limit = 200;
    offset = 0;
    order_dir = 'asc';
    // preference for creation date
    order_by = 'date_created';
  }

  // check limit and reset default
  if (limit < 1 || limit > 1001) {
    return res
      .status(400)
      .json({ error: 'limit: minimum is 1 , maximum is 1000' });
  }

  // check order_dir and reset default
  if (order_dir !== 'asc' && order_dir !== 'desc') {
    return res
      .status(400)
      .json({ error: 'order_dir: value must be one of: asc , desc' });
  }

  // check order_by and reset default
  if (order_by) {
    let info = null;
    info = check.order_by.map(elem => {
      if (elem === order_by) {
        return order_by;
      }
    });
    if (!info) {
      return res.status(400).json({
        error:
          'order_by: value must be one of: id , title , date_created , date_modified , rating_neatness , rating_cursivity , rating_embellishment , rating_character_width'
      });
    }
  }

  const qs = {
    limit,
    offset,
    order_dir,
    order_by
  };

  console.log('qs: ', qs);

  // request api
  await request(
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      url: `https://${config.get('Key')}:${config.get(
        'Secret'
      )}@api.handwriting.io/handwritings`,
      qs: qs
    },
    async function(error, response) {
      // try {
      // get content-type request
      const content = global._.split(
        response.caseless.dict['content-type'],
        ';'
      );
      // check content-type for error handling
      if (content[0] === 'application/json') {
        const json = JSON.parse(response.body);
        if (json.errors && json.errors[0] && json.errors[0].field) {
          return res.status(429).json(json);
        } else {
          return res.status(200).json(json);
        }
      }
      // } catch (err) {
      return res.status(500).json(err);
      // }
    }
  );
};

const get_render_png = async (req, res) => {
  let {
    handwriting_id,
    text,
    handwriting_size,
    handwriting_color,
    width,
    height,
    line_spacing,
    line_spacing_variance,
    word_spacing_variance,
    random_seed
  } = req.body;

  // check data
  if (!handwriting_id || !text) {
    return res.status(400).json({
      error: "no handwriting_id or text set. Can't render any response"
    });
  }

  // check handwriting_size and reset default
  if (!handwriting_size || handwriting_size < 0 || handwriting_size > 9000) {
    handwriting_size = '20px';
  }

  // check handwriting_color and reset default
  if (
    !handwriting_color ||
    handwriting_color[0] !== '#' ||
    handwriting_color.length !== 7
  ) {
    handwriting_color = '#000000';
  }

  // check width and reset default
  if (!width) {
    width = '504px';
  } else {
    const number_width = Number(global._.replace(width, 'px', ''));
    if (number_width < 0 || number_width > 9000) {
      number_width = '504px';
    }
  }

  // check height and reset default
  if (!height) {
    height = '360px';
  } else {
    const number_height = Number(global._.replace(height, 'px', ''));
    if (number_height < 0 || number_height > 9000) {
      number_height = '360px';
    }
  }

  // check line_spacing and reset default
  if (
    line_spacing !== undefined ||
    line_spacing !== null ||
    line_spacing < Math.floor(0.0) ||
    line_spacing > Math.floor(5.0)
  ) {
    line_spacing = Math.floor(1.5);
  }

  // check line_spacing_variance and reset default
  if (
    line_spacing_variance !== undefined ||
    line_spacing_variance !== null ||
    line_spacing_variance < Math.floor(0.0) ||
    line_spacing_variance > Math.floor(1.0)
  ) {
    line_spacing_variance = Math.floor(0.0);
  }

  // check word_spacing_variance and reset default
  if (
    word_spacing_variance !== undefined ||
    word_spacing_variance !== null ||
    word_spacing_variance < Math.floor(0.0) ||
    word_spacing_variance > Math.floor(1.0)
  ) {
    word_spacing_variance = Math.floor(0.0);
  }

  if (random_seed !== -1 && random_seed !== 1) {
    random_seed = -1;
  }

  const qs = {
    handwriting_id,
    text,
    handwriting_size,
    handwriting_color,
    width,
    height,
    line_spacing,
    line_spacing_variance,
    word_spacing_variance,
    random_seed
  };

  console.log('qs: ', qs);

  // request api
  await request(
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      url: `https://${config.get('Key')}:${config.get(
        'Secret'
      )}@api.handwriting.io/render/png`,
      qs: qs
    },
    async function(error, response) {
      try {
        // get content-type
        const content = global._.split(
          response.caseless.dict['content-type'],
          ';'
        );
        // check content-type for error handling
        if (content[0] === 'image/png') {
          return res.status(200).send(response.body);
        } else if (content[0] === 'application/json') {
          const json = JSON.parse(response.body);
          if (json.errors && json.errors[0] && json.errors[0].field) {
            return res.status(400).json(json);
          } else {
            return res.status(429).json(json);
          }
        }
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  );
};

const get_render_pdf = async (req, res) => {
  let {
    handwriting_id,
    text,
    handwriting_size,
    handwriting_color,
    width,
    height,
    line_spacing,
    line_spacing_variance,
    word_spacing_variance,
    random_seed
  } = req.body;

  if (!handwriting_id || !text) {
    return res.status(400).json({
      error: "no handwriting_id or text set. Can't render any response"
    });
  }

  if (!handwriting_size || handwriting_size < 0 || handwriting_size > 9000) {
    handwriting_size = '20px';
  }

  if (
    !handwriting_color ||
    handwriting_color[0] !== '#' ||
    handwriting_color.length !== 7
  ) {
    handwriting_color = '#000000';
  }

  if (!width) {
    width = '504px';
  } else {
    const number_width = Number(global._.replace(width, 'px', ''));
    if (number_width < 0 || number_width > 9000) {
      number_width = '504px';
    }
  }

  if (!height) {
    height = '360px';
  } else {
    const number_height = Number(global._.replace(height, 'px', ''));
    if (number_height < 0 || number_height > 9000) {
      number_height = '360px';
    }
  }

  if (
    line_spacing !== undefined ||
    line_spacing !== null ||
    line_spacing < Math.floor(0.0) ||
    line_spacing > Math.floor(5.0)
  ) {
    line_spacing = Math.floor(1.5);
  }

  if (
    line_spacing_variance !== undefined ||
    line_spacing_variance !== null ||
    line_spacing_variance < Math.floor(0.0) ||
    line_spacing_variance > Math.floor(1.0)
  ) {
    line_spacing_variance = Math.floor(0.0);
  }

  if (
    word_spacing_variance !== undefined ||
    word_spacing_variance !== null ||
    word_spacing_variance < Math.floor(0.0) ||
    word_spacing_variance > Math.floor(1.0)
  ) {
    word_spacing_variance = Math.floor(0.0);
  }

  if (random_seed !== -1 && random_seed !== 1) {
    random_seed = -1;
  }

  const qs = {
    handwriting_id,
    text,
    handwriting_size,
    handwriting_color,
    width,
    height,
    line_spacing,
    line_spacing_variance,
    word_spacing_variance,
    random_seed
  };

  console.log('qs: ', qs);

  await request(
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      url: `https://${config.get('Key')}:${config.get(
        'Secret'
      )}@api.handwriting.io/render/pdf`,
      qs: qs
    },
    async function(error, response) {
      try {
        console.log(response.caseless.dict['content-type']);
        const content = global._.split(
          response.caseless.dict['content-type'],
          ';'
        );
        if (content[0] === 'application/pdf') {
          return res.status(200).send(response.body);
        } else if (content[0] === 'application/json') {
          const json = JSON.parse(response.body);
          if (json.errors && json.errors[0] && json.errors[0].field) {
            return res.status(400).json(json);
          } else {
            return res.status(429).json(json);
          }
        }
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  );
};

module.exports = {
  get_handwriting_id,
  get_handwriting,
  get_render_png,
  get_render_pdf
};
