var io = require('socket.io-client/socket.io.js');

var DataCache = {

	socket : io.connect('/'),
	
	sessionInfo: function(success_function, error_function)
	{
			$.ajax({
				url: '/sessioninfo',
				dataType: 'json',
				cache: false,
				success: success_function,
				error: error_function
			});
	},
	loadCommentBoard: function(filter, success_function, error_function)
	{
		$.ajax({
			url: '/messageboard',
			dataType: 'json',
			type: 'POST',	
			data: filter,
			success: success_function,
			error: error_function
		});
	},
	insertCommentBoard: function(filter, comment, success_function, error_function)
	{
			$.extend(comment, {page : filter});
		
			$.ajax({
				url: "/data",
				dataType: 'json',
				type: 'POST',
				data: comment,
				success: success_function,
				error: error_function
			});
	},
	autoRefresh : function(update_function)
	{
		this.socket.on('user', update_function);
	}

};

exports.datacache = DataCache;
