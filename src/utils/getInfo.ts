import _ from 'lodash'

class GetInfoData {
    public static getFromFields (fields: Array<string>, object: Object) {
        return _.pick(object, fields)
    }
}
export default GetInfoData