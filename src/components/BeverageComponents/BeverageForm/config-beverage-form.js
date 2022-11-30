import createForm from '../../../shared/form/create-form'
import { min, max, minLength, maxLength, required } from '../../../shared/validators/validators'


export function configBeverageForm(beverage) {
  let fields = {
    description: {
      value: beverage?.description || '',
      validators: [minLength(2), maxLength(120)]
    },
    abv: {
      value: beverage?.abv || '',
      options: {
        type: 'number'
      },
      validators: [min(0), max(100)]
    },
    ibu: {
      value: beverage?.ibu || '',
      options: {
        type: 'number'
      },
      validators: [min(0), max(200)]
    },
    srm: {
      value: beverage?.srm || '',
      options: {
        type: 'number'
      },
      validators: [min(0), max(200)]
    },
    contentColor: {
      value: beverage?.contentColor || '',
      options: {
        label: 'Content Color'
      }
    } 
  }

  if (!beverage) {
    fields = {
      name: {
        value: beverage?.name || '',
        validators: [required(), minLength(2), maxLength(50)]
      },
      source: {
        value: beverage?.source || '',
        validators: [required(), minLength(2), maxLength(50)]
      },
      style: {
        value: beverage?.style || '',
        validators: [required(), minLength(2), maxLength(50)]
      },

      ...fields,
      
      image: {
        element: 'image'
      }
    }
  }

  return createForm({ fields })
}
