var db=openDatabase("itemDB","1.0","itemDB",65535); // itemDB is the database name

$(function(){

db.transaction(function(transaction){
	var sql="CREATE TABLE audit_responses "+
	"(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
	"question VARCHAR(1024) NOT NULL,"+
	"response VARCHAR(1024) NOT NULL)";
	transaction.executeSql(sql,undefined,function(){
		console.log("Table Created")
	},function(){
		console.log("Table Creation is processing")
	})
});

$("#savetosql").click(function(){
    var question=$("#message-send").val();
    var response=$("#response-box").val();
    db.transaction(function(transaction){
    var sql="INSERT INTO audit_responses(question,response) VALUES(?,?)";
    transaction.executeSql(sql,[question,response],function(){
        alert("New audit is added successfully");
    },function(transaction,err){
        alert(err.message);
    })
    })
})

$("#hidesql").click(function(){
    hidesql();
});

function hidesql(){
    $("#itemlist").children().remove();
}

$("#viewfromsql").click(function(){
    loadData();
});


function loadData(){
    $("#itemlist").children().remove();
    $("#itemlist").append('<tr><th>Question</th><th>Response</th><th>Option</th></tr>')
    db.transaction(function(transaction){
        var sql="SELECT * FROM audit_responses";
        console.log("1")
        transaction.executeSql(sql,undefined,function(transaction,result){
            console.log("2")
            if(result.rows.length){
                for(var i=0;i<result.rows.length;i++){
                    var row=result.rows.item(i);
                    var question=row.question;
                    var id=row.id;
                    var response=row.response;
                    console.log("wow");
                    $("#itemlist").append('<tr id="del'+id+'"><td>'+question+'</td><td id="newqty'+id+
                    '">'+response+'</td><td><a href="#" class="btn btn-danger deleteitem" data-id="'+id+
                    '">Delete</a></td></tr>');
                }
            }
            else{
                $("#itemlist").append('<tr><td colspan="3" align="center">No Item Found</td></tr>');
            }
        },function(transaction,err){
            console.log(transaction)
            console.log("oops")
            console.log(err)
        })
    })
    setTimeout(function(){
    $(".deleteitem").click(function(){
        var sure=confirm("Are you sure to delete this item?");
        if(sure===true){
            var id=$(this).data("id");
            console.log(id);
            db.transaction(function(transaction){
                var sql="DELETE FROM audit_responses where id=?";
                transaction.executeSql(sql,[id],function(){
                    $("#del"+id).fadeOut();
                        alert("Item is deleted successfully");
                    },function(transaction,err){
                        alert(err.message);
                    }
                )
            });
        }
    })
    },1000);
}
});