
		document.addEventListener('DOMContentLoaded', function () {
			let total = 0, discount = 0;
			const calculator = document.querySelector('.calculator');
			const popupTrigger = document.getElementsByClassName('show-popup');
			const checkTrigger = document.querySelector('.check-discount');
			const totalPriceBox = document.querySelector('.total-price');

			function change() {
				let type = +document.getElementsByName('type')[0].value,
				    dop = document.getElementsByName('dop'),
				    dopTotal = 0;

				for(let dopItem of dop) {
					if(dopItem.checked)
						dopTotal += +dopItem.value;
				}

				total = type + dopTotal;
				totalPriceBox.innerHTML = total - (total/100*discount);
			}

			function closePopup() {
				const popupWrap = [...document.getElementsByClassName('popup')];
				popupWrap.forEach(popup => {
					popup.classList.remove('popup--open');
				});
			}

			function checkDiscount(btn) {
				const input = btn.target.closest('.popup').getElementsByTagName('input')[0];
				const discountFor = btn.target.getAttribute('data-discount');
				const discountBox = document.querySelector('.discount-show');
				let discountPercent = 0,
					warning = btn.target.closest('.popup').getElementsByClassName('warning')[0];

				warning.innerHTML = '';

				switch(discountFor) {
					case 'student': discountPercent = 5; break;
					case 'regular': discountPercent = 10; break;
					default: discountPercent = 0;
				}

				const registred = [
					123,
					320,
					980,
					112,
					232,
					993,
					1,
					2,
					908
				];

				if(registred.indexOf(+input.value) != -1) {
					discount = discountPercent;
					change();
					discountBox.innerHTML = '-'+discountPercent+'%';
					document.querySelector('.discount').remove();
					closePopup();
				} else {
					warning.innerHTML = 'Данного номера нет в списке попробуйте еще раз!';
				}
			}

			function cl(event) {
				if(event.target.getAttribute('class') == 'check-discount') checkDiscount(event);
				if(event.target.getAttribute('class') == 'close-popup') closePopup();
			}

			function popup(event) {
				let dataType = event.target.getAttribute('data-type'),
				    popup = document.querySelector('.'+dataType+'-wrap');

				if(!popup) throw 'Popap was not found!';

				popup.classList.add('popup--open');

				popup.removeEventListener('click', cl);
				popup.addEventListener('click', cl);
			}

			calculator.addEventListener('change', change);

			[].forEach.call(popupTrigger, element => {
				element.removeEventListener('click', popup);
				element.addEventListener('click', popup);
			});
		});
