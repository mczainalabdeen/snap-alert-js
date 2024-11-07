(function(global) {

    // Default options
    var defaultOptions = {
        rtl : false ,
        type: 'info',
        title: 'Default Title',
        message: 'This is a default message',
        icon : null ,
        customIcon : null ,

        confirmText: 'OK',
        enableConfirm : false ,
        onConfirm: function() {},

        cancelText: 'Cancel',
        enableCancel: false ,
        onCancel: function() {},


        enableCloseHandler : false ,
        onClose: function() {},

        clickToClose : false ,
        autoClose : true,
        duration: 3000,

        preogressBar : true,
        isDark : false,

        position : 'top left',
        animation : 'slide',
        html : ``,

    };

    var icons = {
        "success" : "bx-check" ,
        "warning" : "bx-bell" ,
        "error" : "bx-error" ,
        "info" : "bx-info-circle" ,
    };

    var positions = {
        "top center" : "snapAlert-top-center" ,
        "bottom center" : "snapAlert-bottom-center" ,
        "top left" : "snapAlert-top-left" ,
        "top right" : "snapAlert-top-right" ,
        "bottom left" : "snapAlert-bottom-left" ,
        "bottom right" : "snapAlert-bottom-right" ,
    };

    // Object to store user-set global options
    var setOptions = {};
    

    function NsAlert() {


        const NsSetOption = (options) =>{
            setOptions = Object.assign({}, defaultOptions, options);
        }
    
        const createAlert = (type = null,title = null,  message = null, options = {}) => {
            settings = Object.assign({}, setOptions, options);

            if (type && type != "html") {
                settings.type = type;
            }else if(type == "html"){
                settings.type = type;
                settings.code = title;
            }
            settings.title = title;
            settings.message = message;
    
            var notClosed = true;
            // Your existing alert creation logic...
            // Create container if it doesn't exist
            var container = document.querySelector('.snapAlert-container.' + positions[settings.position] + '.snapAlert-animation-'+settings.animation);
            if (container == null) {
                const alertDiv = document.createElement('div');
                alertDiv.classList.add('snapAlert-container' , positions[settings.position] , 'snapAlert-animation-'+settings.animation);
                document.body.appendChild(alertDiv);
                container = alertDiv;
            }
    
            const modal = document.createElement('div');
            
            settings.type != 'html' && (modal.innerHTML = `
                <div class="${settings.rtl && 'snapAlert-rtl'} snapAlert-item snapAlert-${settings.type} ${settings.clickToClose && 'snapAlert-clickable'} ${settings.isDark && 'snapAlert-dark'} ${ !settings.preogressBar ? "progress-hide" : '' }">
                    <div class="snapAlert-main">
                        ${ (['info','success','warning','error']).includes(settings.type) ? ( '<div class="snapAlert-icon">' + (settings.customIcon ? settings.customIcon : '<i class="bx '+ (settings.icon ?? icons[settings.type])+'"></i>') + ' </div>' ) : '<div class="snapAlert-no-icon"></div>'}
                        <div>
                            ${settings.title ? '<div class="snapAlert-title">'+settings.title+'</div>' : ''}
                            ${settings.message ? '<div class="snapAlert-message">'+settings.message+'</div>' : ''}
                            <div class="snapAlert-actions">
                            ${ settings.enableConfirm ? '<button class="snapAlert-action snapAlert-action-confirm" snap-alert-confirm >'+ (settings.confirmText??'')+'</button>' : ''}
                            ${ settings.enableCancel ?'<button class="snapAlert-action snapAlert-action-cancel" snap-alert-cancel >'+ (settings.cancelText??'')+'</button>' : ''}
                            </div>
                        </div>
                        ${settings.preogressBar ? "<div style='--snapAlert-progress-duration:"+settings.duration/1000+"s' class='snapAlert-progress-bar'></div>" : '' }
                        <button class="snapAlert-close" snap-alert-close><i class='bx bx-x'></i></button>
                    </div>
                    
                </div>
            `);

            settings.type == 'html' && (modal.innerHTML = `
                <div class="${settings.rtl && 'snapAlert-rtl'} snapAlert-html snapAlert-item snapAlert-${settings.type} ${settings.clickToClose && 'snapAlert-clickable'}">
                    ${settings.code}
                </div>
            `);
    
            const modalContent = modal.querySelector('.snapAlert-item');
            container.appendChild(modal);
    
            setTimeout(() => {
                modalContent.classList.add('snapAlert-'+settings.animation+'-in');
            }, 10);
    
            if (settings.autoClose == true) {
                setTimeout(() => {
                    closeAndRemove();
                }, settings.duration);
            }
    
            // Close and remove alert
            function closeAndRemove() {
                modalContent.classList.remove('snapAlert-'+settings.animation+'-in');
                modalContent.classList.add('snapAlert-'+settings.animation+'-out');
                setTimeout(() => {
                    modal.remove();
                    const container_item_length = (document.querySelectorAll('.snapAlert-container.' + positions[settings.position] + '.snapAlert-animation-'+settings.animation + ' > div')).length;
                    if (container_item_length == 0) {
                        container.remove();
                    }
                },  settings.animation == 'slide' ? 55 : 100 );

                if (settings.enableCloseHandler && notClosed) {
                    setTimeout(() => {
                        notClosed = false;
                        settings.onClose();
                    } , 50);
                    
                }
            }
    
            // Event listeners...
            modal.querySelector('[snap-alert-confirm]')?.addEventListener('click', () => {
                settings.onConfirm();
                closeAndRemove();
            });
    
            modal.querySelector('[snap-alert-cancel]')?.addEventListener('click', () => {
                settings.onCancel();
                closeAndRemove();
            });
    
            modal.querySelector('[snap-alert-close] , .snapAlert-clickable')?.addEventListener('click', () => {
                closeAndRemove();
            });
    
        };
    
        function clearAll() {
            const allAlerts = document.querySelectorAll('.snapAlert-container > div');
            
            allAlerts.forEach((alert , key) => {
                console.log("Key : "+key*2);
                setTimeout(() => {
                    alert.classList.remove('snapAlert-'+settings.animation+'-in');
                    alert.classList.add('snapAlert-'+settings.animation+'-out');
                }, (key*20));
                setTimeout(() => {
                    alert.remove();
                }, 300+(key*20));
            });
        
            const allContainers = document.querySelectorAll('.snapAlert-container');

            allContainers.forEach((container , key) => {
                setTimeout(() => {
                    if (!container.hasChildNodes()) {
                        container.remove();
                    }
                }, 2000);
            });
        }
        
        return {
            success: (title, message , options) => createAlert('success', title, message , options),
            error: (title, message , options) => createAlert('error',  title,message , options),
            warning: (title, message , options) => createAlert('warning', title, message , options),
            info: (title, message , options) => createAlert('info', title, message , options),
            alert: (title, message , options) => createAlert(null, title, message , options),
            html: (title , options) => createAlert('html', title , null , options ),
            clearAll : () => clearAll(),
            SnapOptions : (options) => NsSetOption(options),
            // You can add more methods here for different types
        };
    }

    

    global.SnapAlert = NsAlert;

})(window);
