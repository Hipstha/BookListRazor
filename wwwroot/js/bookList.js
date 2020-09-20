var dataTable;

$(document).ready(function() {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').dataTable({
        "ajax": {
            "url": "/api/book",
            "type": "GET",
            "datatpe": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "40%" },
            {
                "data": "id",
                "render": function(data) {
                    return `<div class="text-center">
                            <a href="/BookLIst/Upsert?id=${data}" 
                               class="btn btn-success text-white"
                               style="cursor:pointer; width: 100px">
                                Edit
                            </a>
                            &nbsp;
                            <a  
                               class="btn btn-danger text-white"
                               style="cursor:pointer; width: 70px"
                               onclick=Delete('/api/book?id=${data}')>
                                Delete
                            </a>
                        </div>
                    `;
                },
                "width": "30%"
            }
        ],
        "lenguage": {
            "emptyTable": "no data found"
        },
        width: "100%"
    });
}

function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        dangerMode: true
    }).then(function(willDelete) {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function(data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    } else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}