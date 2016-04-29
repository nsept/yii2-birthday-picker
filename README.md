Yii2 Birthday Picker
====================
![example](https://camo.githubusercontent.com/1dfdc4f063f5f9c82d0ba4f67138682e512d581e/687474703a2f2f676c756f6e2e7267686f73742e72752f36466a5477344c34582f696d6167652e706e67)

A Yii2 widget extension that allows you to easily create birthday form field.

Installation
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
composer require --prefer-dist nsept/yii2-birthday-picker "*"
```

or add

```
"nsept/yii2-birthday-picker": "*"
```

to the require section of your `composer.json` file.


Usage
-----

Once the extension is installed, simply use it in your code by:

```php
// model
public function rules()
{
    return [
        ['birthday', 'required'],
        ['birthday', \nsept\birthdaypicker\BirthdayValidator::className()],
    ];
}

// view
<?= \nsept\birthdaypicker\BirthdayPickerWidget::widget([
    'form'      => $form,
    'model'     => $model,
    'attribute' => 'birthday'
]) ?>
```
