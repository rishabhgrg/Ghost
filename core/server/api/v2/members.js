const membersService = require('../../services/members').api.memberUserObject;

const members = {
    docName: 'members',
    browse: {
        options: [
            'limit',
            'fields',
            'filter',
            'order',
            'debug',
            'page'
        ],
        permissions: true,
        validation: {},
        query(frame) {
            return membersService.list(frame.options);
        }
    },

    read: {
        headers: {},
        data: [
            'id',
            'email'
        ],
        validation: {},
        permissions: true,
        query(frame) {
            return membersService.get(frame.data, frame.options);
        }
    }
};

module.exports = members;
