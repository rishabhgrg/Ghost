module.exports = function ({
    createMember,
    updateMember,
    getMember,
    listMembers,
    validateMember,
    sendEmail,
    encodeToken,
    decodeToken
}) {
    function requestPasswordReset({email}) {
        return getMember({email}).then((membersCollection) => {
            let member = membersCollection && membersCollection[0];
            if (member) {
                return encodeToken({
                    sub: member.id
                }).then((token) => {
                    return sendEmail(member, {token});
                });
            }
        }, (/*err*/) => {
            // Ignore user not found err;
        });
    }

    function resetPassword({token, password}) {
        return decodeToken(token).then(({sub}) => {
            return updateMember({id: sub}, {password});
        });
    }

    function list(data, options) {
        return listMembers(data, options).then((membersCollection) => {
            return membersCollection;
        });
    }

    return {
        requestPasswordReset,
        resetPassword,
        create: createMember,
        validate: validateMember,
        get: getMember,
        list: list
    };
};
