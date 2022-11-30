import createForm from '../../../shared/form/create-form'
import { minLength, maxLength, required } from '../../../shared/validators/validators'


export function configDeviceForm(device) {
  let fields = {
    title: {
      value: device?.title || '',
      validators: [minLength(2), maxLength(40)]
    },
    city: {
      value: device?.locale.city || '',
      validators: [minLength(2), maxLength(25)]
    },
    region: {
      value: device?.locale.region || '',
      validators: [minLength(2), maxLength(25)]
    },
    country: {
      value: device?.locale.country || '',
      validators: [minLength(2), maxLength(25)]
    }
  }

  if (!device) {
    fields = {
      name: {
        validators: [required(), minLength(2), maxLength(40)]
      },
      hardwareId: {
        validators: [required()],
        options: {
          label: 'Hardware ID'
        }
      },
      ...fields,
      image: {
        element: 'image'
      }
    }
  }

  return createForm({ fields })
}
