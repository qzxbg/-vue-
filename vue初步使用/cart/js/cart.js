/**
 * el：只有根组件才有的选项
 * 
 * 作用：相当于template+$mount()
 * 
 * vue数据：
 * 1.data 定义固定的原始数据
 * 2.computed get,set定义数据，一般由原生数据推断而来 派生数据/计算数据
 */


let app = new Vue({
    el:"#app",
    data:{
        cartItems:cartItems,
        paySty:{"backgroundColor":"red"}
    },
    methods:{
        addQuantity(good){
            console.log(1);
            good.quantity++
        },
        reduceQuantity(good){
            if(good.quantity>1){
                good.quantity--
            }else{
                return
            }
            
        },
        //删除当前商品
        deleteGood(good){
            this.cartItems = this.cartItems.filter((item)=>{
                return item!=good;
            })
        },
        // 删除已选商品
        deleteSeletedAll(){
            this.cartItems = this.cartItems.filter((item)=>{
                return item.checked != true;
            })
        }
    },
    computed:{
        allChecked:{
            get(){
                return this.cartItems.every(cartItems => cartItems.checked)
            },
            set(newval){
                this.cartItems.forEach(item => {
                    item.checked = newval
                });
            }
        },
        total:{
            get(){
                let total = 0;
                this.cartItems.forEach((item)=>{
                    if(item.checked === true){
                        total += item.quantity;
                    }
                })
                return total;
            }
        },
        totalPrice:{
            get(){
                let totalP = 0;
                this.cartItems.forEach((item)=>{
                    if(item.checked === true){
                        totalP += item.quantity*item.price/100
                    }
                })
                return totalP.toFixed(2);
            }
        },
        isPay:{
            get(){
                if(this.total>0){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }
});