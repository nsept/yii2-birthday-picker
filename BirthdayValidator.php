<?php


namespace nsept\birthdaypicker;

use Yii;
use yii\validators\Validator;

class BirthdayValidator extends Validator
{
    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
        if ($this->message === null) {
            $this->message = Yii::t('yii', '{attribute} is invalid.');
        }
    }

    /**
     * @param string $dateVar
     * @return bool
     */
    public static function isValidDate($dateVar) {
        if ($dateVar != '') {
            if (!strtotime($dateVar)) {
                return false;
            }

            $date = date_parse($dateVar);

            if($date["year"] > date("Y") || $date["year"] < date("Y") - 100) {
                return false;
            }

            if (!checkdate($date["month"], $date["day"], $date["year"])) {
                return false;
            }
        }

        return true;
    }

    /**
     * @inheritdoc
     */
    protected function validateValue($value)
    {
        $valid = $this->isValidDate($value);

        if (!$valid) {
            return [$this->message, []];
        }

        return null;
    }
}

