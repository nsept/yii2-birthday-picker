Yii2 Birthday Picker
====================
![example](http://gluon.rghost.ru/6FjTw4L4X/image.png)

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
