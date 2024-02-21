//probably shouldve been a class...
const __cardID__protoype = {

    whileHover:(function(){
        if (this.mouseLeaveTime == 0) {
            setInterval(() => {
                if (this.mouseLeaveTime == 0) {
                    this.pcTimeSpent = Date.now()
                }else{
                    this.pcTimeSpent += 100;
                }
            }, 100);
        }
    }),

    calcTime: ()=>{
        if (this.mouseEnterTime > 0 && this.mouseLeaveTime > 0) {
            return this.mouseEnterTime - mouseLeaveTime;
        }
        return undefined;
    },

    onMouseEnter:(function(){
        console.log(this);
        clearTimeout(this.timeoutID);
        this.whileHover();
    }),

    onMouseLeave:(function(){
        if ((this.CurrentTime < 5000) && (wrappedCard.pcTimeSpent > 1000)) {
            console.log(this);
            this.timeoutID = setTimeout(wrappedCard.triggerNext, extendTime);
            this.mouseLeaveTime = Date.now();
            console.log(this.timeoutID)
            console.log(this.currentTime)
        }else{
            wrappedCard.timeoutID = setTimeout(wrappedCard.triggerNext, wrappedCard.CurrentTime)
        }   
    }),

    triggerNext:(function (nextCard, cssEffect) {
        nextCard.timeoutID = setTimeout(() => {
            this.__Card__.css(cssEffect);
                this.__Card__.trigger('next', [nextCard, cssEffect])
        }, nextCard.intervalTime)
    }),
    //csseffectObject {"transition-duration": "2s", "opacity": "0"}, is not testing for null or anything else, care! duration first, other effects after.
    onNext:(function (event, card, cssEffect) {
            if (card.__Card__.hasClass("d-none") || card.__Card__.css("opacity") == "0") {
                card.__Card__.css('transition-duration', '5s');
                card.setElementVisibility();
            } else if (card.__Card__.css("opacity") == "0") {
                card.setElementVisibility()
            }
    }),

    timeLeft: ()=>{
        return Math.ceil((this.timeoutID)._idleStart + this.timeoutID._idleTimeout - Date.now());
    },
    setElementVisibility: (function () {
        if (this.__Card__.hasClass("d-none")) {

            this.__Card__.removeClass("d-none");
        }
        else if((this.__Card__.css("opacity") == '0')) {
            this.__Card__.css("transition-duration", "5s");
            this.__Card__.css("opacity", "1");
        }
    }),


}
function CardTrigger(htmlcard, intervalTime, extendTime) {
    //baseobject
    this.__Card__ = $(htmlcard);
    //eventHandlers for base data;
    this.__Card__.on('mouseenter',()=>{ this.onMouseEnter()});
    this.__Card__.on('mouseleave',()=>{ this.onMouseLeave()} );
    //base data;
    this.__Card__.on('next', this.onNext);
    this.timeoutID = 0;
    this.intervalTime = intervalTime;
    this.CurrentTime = this.timeLeft;
    this.extendTime = extendTime;
    this.pcTimeSpent = 0;
    this.mouseLeaveTime=0;
}

//defaults too 5400ms
function CardLoop(TimePerCard = 15400, cardSelector, csseffectObject, extendTime = 13000) {
    const defaultPerItem = 15400; 

    this.ElementsCount = cardSelector.length;
    this.CsseffectObject = csseffectObject;

    this.Start = () => {
        Object.assign(CardTrigger.prototype, __cardID__protoype);
        let Elements = [...cardSelector];
        console.log(Elements);
        Elements = Elements.map(element => new CardTrigger(element, TimePerCard, extendTime));
        let index;
        Elements.forEach((item) => {
            if (!item.__Card__.hasClass('d-none')) {
                index = Elements.indexOf(item);
                if (index < 0) {
                    throw "index in Loop returned -1"
                } else if ((index == 0) || (index < Elements.length - 1)) {
                   return item.triggerNext(Elements[index + 1], csseffectObject);
                } else if (index == Elements.length - 1) {
                   return item.triggerNext(Elements[0], csseffectObject);
                }
            }
        })
        setInterval(() => {
            if (index < 0) {
                throw "index in loop returned -1"
            } else if ((index == 0) || (index < Elements.length-1)) {
                Elements[index].triggerNext(Elements[index + 1], csseffectObject);
                ++index;
                console.log(index + ':::index');
            } else if (index == Elements.length - 1) {
                Elements[index].triggerNext(Elements[0], csseffectObject);
                index = 0;
                console.log(index + ':::index =0')
            }
        },Elements[index].intervalTime)
    }
   
    
}




var __emplace__prototype__ = {

}
$(function () {
    $(".card").parent().is(".column, .h-25, mb-lg-2, bg-opacity-75");
    
    $(".card").each((index, item) => {
        if ($(item).attr("data-transpose-top") != undefined) {
            let keyvaluep = $(item).attr("data-transpose-top").replace(";", "");
            let result = Object.fromEntries([keyvaluep.split(":")]);
            $(item).css(result);
            console.log($(item).attr("data-transpose-top"));
        }
        var a =()=>{
            var b = new Array();
            $('.card').each((index, element) => {
                if ($(element).parent().is(".column, .h-25, mb-lg-2, bg-opacity-75")) {
                    b.push(element);
                    console.log(element);
                }
            })
            return b;
        }
        let loop = new CardLoop(15400, a(),
            {
                'opacity': '0',
                'transition-duration': '5s'
            }, 13000)
        loop.Start();


    })

})
