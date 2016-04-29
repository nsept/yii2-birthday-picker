<?php

namespace nsept\birthdaypicker;

use Yii;
use yii\widgets\InputWidget;
use yii\helpers\Json;
use yii\base\InvalidConfigException;
use yii\bootstrap\Html;
use yii\helpers\ArrayHelper;

class BirthdayPickerWidget extends InputWidget
{
    /**
     * @var \yii\widgets\ActiveForm
     */
    public $form;

    /**
     * @var string
     */
    public $template = "{label}\n{input}\n{error}";

    /**
     * @var array
     */
    public $pluginOptions = [];

    /**
     * @return array
     */
    protected function getMonthNames()
    {
        $formatter = new \IntlDateFormatter(Yii::$app->language, \IntlDateFormatter::FULL, \IntlDateFormatter::FULL);
        $formatter->setPattern('MMMM');

        $list = [];

        for ($i = 0; $i < 12; $i++) {
            $list[] = $formatter->format(mktime(0, 0, 0, $i, 1, 1970));
        }

        $list[] = array_shift($list);

        return $list;
    }

    /**
     * @return string
     */
    protected function getTemplate()
    {
        $source = \Yii::$app->formatter->asDate(time(), 'medium');

        if(preg_match('/^\d{4}(\s|\.|\/|-)/u', $source) || \Yii::$app->language == 'ar') {
            return 'year,month,day';
        }

        if(preg_match('/^\d{1,2}\.\d{2}.\\d{4}$/u', $source)) {
            return 'day,month,year';
        }

        if(preg_match('/^\d{1,2}(\s|\.|\/|-)/u', $source)) {
            return 'day,month,year';
        }

        return 'month,day,year';
    }

    /**
     * @inheritdoc
     */
    public function run()
    {
        parent::init();

        if(!isset($this->pluginOptions['monthNames'])) {
            $this->pluginOptions = ArrayHelper::merge($this->pluginOptions, ['monthNames' => $this->getMonthNames()]);
        }

        if(!isset($this->pluginOptions['template'])) {
            $this->pluginOptions = ArrayHelper::merge($this->pluginOptions, ['template' => $this->getTemplate()]);
        }

        BirthdayPickerAsset::register($this->view);

        $pluginOptions = Json::encode($this->pluginOptions);

        $this->view->registerJs(sprintf('$("#%s").birthdayPicker(%s)', $this->options['id'], $pluginOptions));

        if ($this->hasModel()) {
            if ($this->form == null)
                throw new InvalidConfigException(__CLASS__ . '::$form must be specifed.');

            return $this->form->field($this->model, $this->attribute,
                ['template' => $this->template])->textInput($this->options);

        } else {
            return Html::textInput($this->name, $this->value, $this->options);
        }
    }
}
