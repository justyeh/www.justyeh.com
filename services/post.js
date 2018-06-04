let database = require('../utils/database');
let tagSys = require('./tag');

let helper = require('../utils/helper');

exports.getPostById = async(postId) => {

    if (!helper.isInteger(postId)) {
        return { code: 500, message: '无效的ID' }
    }

    let postInfo = await database.query('select * from post where id = ?', [postId]);
    if (!postInfo) {
        return { code: 500, message: '服务器错误' }
    }
    if (postInfo.length == 0) {
        return { code: 400, message: '没有相关数据' }
    }
    let tagList = await tagSys.getPostTags(postId);
    return {
        code: 200,
        data: {...postInfo[0], tagList },
        message: 'success'
    }
}

exports.getPostList = async(postStatus, search, pageNo, pageSize) => {

    if (!helper.isInteger(pageNo)) {
        return { code: 500, message: '无效的页码' }
    }

    let postList = await database.query('select * from post where status = ? and title like ? order by id desc limit ?,?', [postStatus, `%${search || ''}%`, ((pageNo - 1) * pageSize), pageSize]);

    if (!postList) {
        return { code: 500, message: '服务器错误' }
    }

    getTagsList = [];
    postList.forEach(item => {
        getTagsList.push(tagSys.getPostTags(item.id))
    });
    tagList = await Promise.all(getTagsList);
    postList.map((item, index) => {
        item.tags = tagList[index]
    });

    return { code: 200, data: postList, message: 'success' };
}

exports.getPostListByTagId = async(postStatus, tagId) => {
    if (!helper.isInteger(tagId)) {
        return { code: 500, message: '无效的ID' }
    }

    var tagInfo = await tagSys.getTagById(tagId);
    if (!tagInfo || tagInfo.length == 0) {
        return { code: 400, message: '没有相关数据' }
    }

    var postList = await database.query('select * from post where  status = ? and id in (select post_id from post_tag where tag_id = ?)', [postStatus, tagId]);

    if (!postList) {
        return { code: 500, message: '服务器错误' }
    }

    searchList = [];
    postList.forEach(item => {
        searchList.push(tagSys.getPostTags(item.id))
    });
    tagList = await Promise.all(searchList);
    postList.map((item, index) => {
        item.tags = tagList[index]
    });

    return {
        code: 200,
        data: {
            ...tagInfo[0],
            postList
        },
        message: 'success'
    }
}

exports.getPostCount = async(postStatus, search) => {
    var result = await database.query('select count(id) as `count` from post where status = ? and title like ?', [postStatus, `%${search || ''}%`]);
    return result ? result[0].count : 0
}

exports.addPost = async post => {
    var insertRow = await database.query('insert into post(title,poster,summary,markdown,status,allow_comment,updated_at) values(?,?,?,?,?,?,?)', [
        post.title,
        post.poster,
        post.summary,
        post.markdown,
        post.status,
        post.allow_comment,
        new Date().getTime()
    ]);

    if (insertRow && insertRow.insertId) {
        return { code: 200, data: { id: insertRow.insertId }, message: 'insert success' }
    } else {
        return { code: 500, message: 'insert fail' }
    }
}

exports.updatePost = async post => {
    var result = await database.query('update post set title=?,poster=?,summary=?,markdown=?,status=?,allow_comment=?,updated_at=? where id = ?', [
        post.title,
        post.poster,
        post.summary,
        post.markdown,
        post.status,
        post.allow_comment,
        new Date().getTime(),
        post.id
    ]);
    if (result && result.affectedRows >= 0) {
        return { code: 200, message: 'update success' }
    } else {
        return { code: 500, message: 'update fail' }
    }
}

exports.updatePostTag = async(postId, tagList) => {
    var deleteOldTag = await database.query('delete from post_tag where post_id = ?', [postId]);
    if (tagList.length == 0) {
        return { code: 200, message: 'update success' }
    }
    if (deleteOldTag) {
        var insertList = tagList.map(item => {
            return database.query('insert into post_tag(post_id,tag_id) values(?,?)', [postId, parseInt(item)])
        });
        var insertNewTag = await Promise.all(insertList);
        if (insertNewTag) {
            return { code: 200, message: 'update success' }
        }
    }
    return { code: 500, message: 'update fail' }
}