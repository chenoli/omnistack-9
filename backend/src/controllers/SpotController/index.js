const Spot = require('../../models/Spot');
const User = require('../../models/User');

module.exports = {
  async index(request, response) {
    const { tech } = request.query;
    const spots = await Spot.find({ techs: tech });
    return response.json(spots);
  },

  async store(request, response) {
    const { filename } = request.file;
    const { user_id } = request.headers;
    const { company, price, techs } = request.body;

    const user = await User.findById(user_id);

    if (!user) {
      return response.status(400).json({ error: 'User does not exist!' })
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      price,
      techs: techs.split(',').map(tech => tech.trim()),
    })

    response.json(spot);
  },
};
