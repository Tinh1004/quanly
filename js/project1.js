//tạo đối tượng
function hocVien(firstName,lastName,age,gender,phone,dangky,endDay){
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.phone = phone;
    this.dangky = dangky;
    this.endDay = endDay;


    function setFirstName(firstName){
        this.firstName = firstName;
    }
    function getFirstName(){
        return this.firstName;
    }
    function setLastName(lastName){
        this.lastName = lastName;
    }
    function getLastName(){
        return this.lastName;
    }
    function setAge(age){
        this.age = age;
    }
    function getAge(){
        return this.age;
    }
    function setGender(gender){
        this.gender = gender;
    }
    function getGender(){
        return this.gender;
    }
}
function dangky(hinhthuc,soluong){
    this.hinhthuc = hinhthuc;
    this.soluong = soluong;

    function showInfo(){
        console.log("Hình thức: "+this.hinhthuc+" - số lượng: "+this.soluong)
    }
}


var students = []
var user1 = new hocVien("Tính","Phạm Ngọc",20,'Nam','0326693102',new dangky("month",1),'10/12/2020');
students.push(user1);
var user2 = new hocVien("An","Ngô Trường",20,'Nam','0123456789',new dangky("month",2),'20/12/2020');
students.push(user2);
var user3 = new hocVien("Ý","Hường Thị Như",20,'Nữ','1234567890',new dangky("year",1),'20/5/2020');
students.push(user3);
console.log(students);
indanhsach(students);
//hinh thuc
function inHinhThuc(hinhthuc){
    if(hinhthuc==='month') return 'Tháng'
    return 'Năm';
}
//in ra danh sách
function indanhsach(arr){
    var showif = document.getElementById('danhsach');
    var html = arr.map(student =>`
        <div class="student">
            <p>${student.lastName} ${student.firstName}</p>
            <p>${student.age}</p>
            <p>${student.gender}</p>
            <p>${student.phone}</p>
            <p>${inHinhThuc(student.dangky.hinhthuc)}</p>
            <p>${student.dangky.soluong}</p>
            <p>${student.endDay}</p>

        </div>
    `).join('');
    showif.innerHTML = html;
}


//tạo các biến element
var firstName = document.getElementById('firstName');//Tên
var lastName = document.getElementById('lastName');//Họ
var numberPhone = document.getElementById('numberPhone');//số điện thoại
var age = document.getElementById('age');//tuổi
var gender = document.getElementById('gender');//giới tính
var hinhthuc = document.getElementById('hinhthuc');//hình thức đăng ký
var soluong = document.getElementById('soluong');//số lượng


var chua = [firstName,lastName,numberPhone,age,gender,soluong]
var theo = ["Tên","Họ và Họ Đệm","Số điện thoại","Tuổi","Giới tính","Số lượng"]


//function in ra ngày tháng
function getDate(hinhthuc,soluong){
    //tạo biến này tháng năm
    var dateNow = new Date();
    if(hinhthuc=='month'){
        if(checkMonth(dateNow.getMonth()+1,soluong)){
            return `${dateNow.getDate()}/${dateNow.getMonth()+1+soluong}/${dateNow.getFullYear()}`
        }
        return `${dateNow.getDate()}/${dateNow.getMonth()+1+soluong-12}/${dateNow.getFullYear()+1}`
    }
    return `${dateNow.getDate()}/${dateNow.getMonth()+1}/${dateNow.getFullYear()+soluong}`
}
ngayKetThuc = getDate('month',2)
console.log(ngayKetThuc);
// console.log(hinhthuc.value)
//kiểm tra tháng
function checkMonth(month,soluong){
    if(month+soluong>12){
        return false;
    }
    return true;
}



//Trả về số tiền Đăng ký hình thức
function registration(HT){
    if(HT==='month'){
        return 200000;
    }
    else{
        return 12*120000;
    }
}

//kiểm tra nhập
function kiemTra(a){
    if(a===''){
        return false
    }
    return true;
}

//kiểm tra số điện thoại
function checkPhone(a){
    if(a.length===10) return true;
    return false;
}
// function gioitinh(gender){
//     switch(gender){
//         case 1: return 'Nam';
//         default: return 'Nữ'
//     }
// }


//sự kiện onclick
function btn(){
    var ten = firstName.value;//first name
    var ho = lastName.value;//last Name
    var fullName = ho +' '+ten;// ho + ten: full name
    var soDT= numberPhone.value; // number phone
    var tuoi = age.value;//age   
    var GT = gender.value;//gender
    var amount = Number(soluong.value); //số lượng
    var HTDK = hinhthuc.value;//hình thức đăng ký: tháng/năm
    var money = amount* registration(HTDK,amount);// tổng số tiền của khách hàng
    var ngayKetThuc = getDate(HTDK,amount);
    
    var ok = true;//kiểm tra
    var key_strong = [];//mảng các phần tử không nhập vô

    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;// kiểm tra số điện thoại
    
    for(let a of chua){
        if(!kiemTra(a.value)){
            for(var  i = 0;i<chua.length;i++){
                if(a==chua[i]){
                    key_strong.push(theo[i]);
                }
            }
            a.style.border = '1px solid red';
            ok = false;
        }
    }
    if(!ok){
        var str = '';
        for(let i of key_strong){
            console.warn(i)
            str+= i +', '
        }
        alert("Thiếu "+str)
        return;
    }
    if(!checkPhone(numberPhone.value) ||vnf_regex.test(numberPhone.value) == false){
        numberPhone.style.border = '1px solid red';
        alert("Số điện thoại không hợp lệ")
        return;
    }
    var user= new hocVien(ten,ho,tuoi,GT,soDT,new dangky(HTDK,amount),ngayKetThuc)
    students.push(user);

    console.log(students);
    console.log(money);
    console.log(ngayKetThuc)

    alert(`Thêm thành công!\n${fullName}`)
    indanhsach(students);
}

//đổi màu input khi ta tô màu vào
function getText(){
    for(let a of chua){
        a.style.border = '1px solid #ccc';
    }
}