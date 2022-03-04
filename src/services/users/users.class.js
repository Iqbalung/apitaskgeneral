const { Service } = require('feathers-mongoose');
/// We need this to create the MD5 hash
const crypto = require('crypto');

// The Gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar';
// The size query. Our chat needs 60px images
const query = 's=60';
// Returns the Gravatar image for an email
const getGravatar = grvt => {
  // Gravatar uses MD5 hashes from an email address (all lowercase) to get the image
  const hash = crypto.createHash('md5').digest('hex');
  // Return the full avatar URL
  return `${gravatarUrl}/${hash}?${query}`;
};

exports.Users = class Users extends Service {

  async create(data, params) {
    // Use the existing avatar image or return the Gravatar for the email
    const avatar = data.avatar || getGravatar('avatarbro');
    // The complete user
    const userData = {
      ...data,
      avatar
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }

};
