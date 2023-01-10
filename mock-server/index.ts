#! /usr/bin/env tsx
/* eslint-disable max-len */
import fastify from 'fastify';

const app = fastify();

app.get('/recommendations', async () => ({
  recommendations: [
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Blau',
      },
      sku: '35UP004C5BLF7000436',
      price: {
        value: 25.99,
        formatted: '€ 25,99',
        currency: 'EUR',
      },
      name: 'CLASSIC BLUE Premium Hülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/045ae7fa-9240-4d6a-a579-ef588e633d7a.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Schutz Deluxe: Durch einen schockabsorbierenden Zwischenlayer aus Silikon und einer kratzfesten Hartschalen-Rückseite bietet die Premium Handyhülle deinem Smartphone maximalen Schutz.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Schutz Deluxe: Durch einen schockabsorbierenden Zwischenlayer aus Silikon und einer kratzfesten Hartschalen-Rückseite bietet die Premium Handyhülle deinem Smartphone maximalen Schutz.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Blau',
      },
      sku: '35UP004C5BLF7000014',
      price: {
        value: 21.99,
        formatted: '€ 21,99',
        currency: 'EUR',
      },
      name: 'CLASSIC BLUE Hardcase Hülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/3e3685bb-fce2-44bb-b953-049285e07e7f.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Die Hardcase Handyhülle mit kratzfester Oberfläche ist mit einer einfachen Klickbefestigung an dein Smartphone angebracht. Die Hülle umschließt dein Gerät für optimalen Halt und Schutz.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Die Hardcase Handyhülle mit kratzfester Oberfläche ist mit einer einfachen Klickbefestigung an dein Smartphone angebracht. Die Hülle umschließt dein Gerät für optimalen Halt und Schutz.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Blau',
      },
      sku: '35UP004C5BLF30003B3',
      price: {
        value: 16.99,
        formatted: '€ 16,99',
        currency: 'EUR',
      },
      name: 'CLASSIC BLUE Silikonhülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/b91bf860-af0c-44ee-937f-ffba9c8e9fc2.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Das strapazierfähige Silikon macht diese Handyhülle zum flexiblen Schutz für dein Smartphone. Die Hülle umschließt dein Gerät für einen guten Sitz maximalen Stoßschutz und kann einfach Auf- und Abgezogen werden.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Das strapazierfähige Silikon macht diese Handyhülle zum flexiblen Schutz für dein Smartphone. Die Hülle umschließt dein Gerät für einen guten Sitz maximalen Stoßschutz und kann einfach Auf- und Abgezogen werden.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Rot',
      },
      sku: '35UP004C5BLF30000B6',
      price: {
        value: 16.99,
        formatted: '€ 16,99',
        currency: 'EUR',
      },
      name: 'RED Silikonhülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/59042d21-5015-4767-926b-e418c67c9a0d.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Das strapazierfähige Silikon macht diese Handyhülle zum flexiblen Schutz für dein Smartphone. Die Hülle umschließt dein Gerät für einen guten Sitz maximalen Stoßschutz und kann einfach Auf- und Abgezogen werden.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Das strapazierfähige Silikon macht diese Handyhülle zum flexiblen Schutz für dein Smartphone. Die Hülle umschließt dein Gerät für einen guten Sitz maximalen Stoßschutz und kann einfach Auf- und Abgezogen werden.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Blau',
      },
      sku: '35UP004C5BLF20009B8',
      price: {
        value: 16.99,
        formatted: '€ 16,99',
        currency: 'EUR',
      },
      name: 'NAVY Silikonhülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/f3dbb22c-90e1-473c-a648-07dbf05756d8.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Das strapazierfähige Silikon macht diese Handyhülle zum flexiblen Schutz für dein Smartphone. Die Hülle umschließt dein Gerät für einen guten Sitz maximalen Stoßschutz und kann einfach Auf- und Abgezogen werden.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Das strapazierfähige Silikon macht diese Handyhülle zum flexiblen Schutz für dein Smartphone. Die Hülle umschließt dein Gerät für einen guten Sitz maximalen Stoßschutz und kann einfach Auf- und Abgezogen werden.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Rot',
      },
      sku: '35UP004C5BLF7000139',
      price: {
        value: 25.99,
        formatted: '€ 25,99',
        currency: 'EUR',
      },
      name: 'RED Premium Hülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/4effbfd3-2c85-4db7-b90e-891132c137ff.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Schutz Deluxe: Durch einen schockabsorbierenden Zwischenlayer aus Silikon und einer kratzfesten Hartschalen-Rückseite bietet die Premium Handyhülle deinem Smartphone maximalen Schutz.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Schutz Deluxe: Durch einen schockabsorbierenden Zwischenlayer aus Silikon und einer kratzfesten Hartschalen-Rückseite bietet die Premium Handyhülle deinem Smartphone maximalen Schutz.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Blau',
      },
      sku: '35UP004C5BLF7000030',
      price: {
        value: 25.99,
        formatted: '€ 25,99',
        currency: 'EUR',
      },
      name: 'NAVY Premium Hülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/ddd569bb-85f7-4cbb-bfaa-b2a114be5ece.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Schutz Deluxe: Durch einen schockabsorbierenden Zwischenlayer aus Silikon und einer kratzfesten Hartschalen-Rückseite bietet die Premium Handyhülle deinem Smartphone maximalen Schutz.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Schutz Deluxe: Durch einen schockabsorbierenden Zwischenlayer aus Silikon und einer kratzfesten Hartschalen-Rückseite bietet die Premium Handyhülle deinem Smartphone maximalen Schutz.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Rot',
      },
      sku: '35UP004C5BLF6000916',
      price: {
        value: 21.99,
        formatted: '€ 21,99',
        currency: 'EUR',
      },
      name: 'RED Hardcase Hülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/15016720-7c3a-4741-94d9-408d0853e370.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Die Hardcase Handyhülle mit kratzfester Oberfläche ist mit einer einfachen Klickbefestigung an dein Smartphone angebracht. Die Hülle umschließt dein Gerät für optimalen Halt und Schutz.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Die Hardcase Handyhülle mit kratzfester Oberfläche ist mit einer einfachen Klickbefestigung an dein Smartphone angebracht. Die Hülle umschließt dein Gerät für optimalen Halt und Schutz.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Einfarbig, Schwarz',
      },
      sku: '35UP004C5BLF20008B9',
      price: {
        value: 16.99,
        formatted: '€ 16,99',
        currency: 'EUR',
      },
      name: 'PITCH BLACK Silikonhülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/4560e33b-2396-458e-9e19-c6d61a041d38.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Das strapazierfähige Silikon macht diese Handyhülle zum flexiblen Schutz für dein Smartphone. Die Hülle umschließt dein Gerät für einen guten Sitz maximalen Stoßschutz und kann einfach Auf- und Abgezogen werden.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Das strapazierfähige Silikon macht diese Handyhülle zum flexiblen Schutz für dein Smartphone. Die Hülle umschließt dein Gerät für einen guten Sitz maximalen Stoßschutz und kann einfach Auf- und Abgezogen werden.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'Neodigital',
        logo: {
          square: 'https://static.35up.io/vendors/neodigital/logo/square.png',
          landscape: 'https://static.35up.io/vendors/neodigital/logo/landscape.png',
        },
        legalName: 'Neodigital Versicherung AG',
        id: 'neodigital',
      },
      urls: {
        legal: 'https://neodigital.de/neo-elektronik-s-2021-lp/',
      },
      specs: {
        type: 'insurance',
        contract: {
          duration: {
            value: 1,
            unit: 'year',
          },
        },
      },
      sku: '35UP005NE0DGF600050',
      price: {
        value: 10.99,
        label: 'monatlich',
        formatted: '€ 10,99',
        currency: 'EUR',
      },
      name: 'Comfort-Versicherung für dein iPhone 12',
      images: {
        thumbnail: 'https://static.35up.io/products/neodigital/2022/11/02/thumbnail.png?session=123abc',
      },
      descriptions: {
        short: 'Dein Versicherungsschutz für dein iPhone 12 von NeoDigital',
        long: 'Versichert wird ein iPhone 12 im genannten Warenkorbwert gegen Abhandenkommen, Beschädigung oder Zerstörung nach dem Tarif Neo Elektronik. Es ist eine Selbstbeteiligung von 0% des Neupreises vereinbart. Die Versicherungsprämie beträgt monatlich 10.38€. Die Police, diese Beratung und alle Informationen zur Versicherung sind im Portal myNeo abrufbar. Adresse und Zugangsdaten erhalten Sie per E-Mail.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 1,
      },
      categories: [
        'insurances',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Einfarbig, Schwarz',
      },
      sku: '35UP004C5BLF20005B2',
      price: {
        value: 16.99,
        formatted: '€ 16,99',
        currency: 'EUR',
      },
      name: 'Grids Silikonhülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/81be997f-65f5-4676-b911-2b6127361f7b.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Das strapazierfähige Silikon macht diese Handyhülle zum flexiblen Schutz für dein Smartphone. Die Hülle umschließt dein Gerät für einen guten Sitz maximalen Stoßschutz und kann einfach Auf- und Abgezogen werden.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Das strapazierfähige Silikon macht diese Handyhülle zum flexiblen Schutz für dein Smartphone. Die Hülle umschließt dein Gerät für einen guten Sitz maximalen Stoßschutz und kann einfach Auf- und Abgezogen werden.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Bunt',
      },
      sku: '35UP004C5BLF30004B2',
      price: {
        value: 16.99,
        formatted: '€ 16,99',
        currency: 'EUR',
      },
      name: 'Digital Swirl Silikonhülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/41cf9fdd-4532-4b73-82a3-c38228b41072.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Das strapazierfähige Silikon macht diese Handyhülle zum flexiblen Schutz für dein Smartphone. Die Hülle umschließt dein Gerät für einen guten Sitz maximalen Stoßschutz und kann einfach Auf- und Abgezogen werden.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Das strapazierfähige Silikon macht diese Handyhülle zum flexiblen Schutz für dein Smartphone. Die Hülle umschließt dein Gerät für einen guten Sitz maximalen Stoßschutz und kann einfach Auf- und Abgezogen werden.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Einfarbig, Schwarz',
      },
      sku: '35UP004C5BLF6000619',
      price: {
        value: 21.99,
        formatted: '€ 21,99',
        currency: 'EUR',
      },
      name: 'BLACK Hardcase Hülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/844f1f93-6c1d-47ed-b8d1-2cea3c81916d.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Die Hardcase Handyhülle mit kratzfester Oberfläche ist mit einer einfachen Klickbefestigung an dein Smartphone angebracht. Die Hülle umschließt dein Gerät für optimalen Halt und Schutz.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Die Hardcase Handyhülle mit kratzfester Oberfläche ist mit einer einfachen Klickbefestigung an dein Smartphone angebracht. Die Hülle umschließt dein Gerät für optimalen Halt und Schutz.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Einfarbig, Schwarz',
      },
      sku: '35UP004C5BLF6000734',
      price: {
        value: 25.99,
        formatted: '€ 25,99',
        currency: 'EUR',
      },
      name: 'Grids Premium Hülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/d44ac63a-4cb1-4cdf-978a-d5156efb6f41.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Schutz Deluxe: Durch einen schockabsorbierenden Zwischenlayer aus Silikon und einer kratzfesten Hartschalen-Rückseite bietet die Premium Handyhülle deinem Smartphone maximalen Schutz.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Schutz Deluxe: Durch einen schockabsorbierenden Zwischenlayer aus Silikon und einer kratzfesten Hartschalen-Rückseite bietet die Premium Handyhülle deinem Smartphone maximalen Schutz.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Einfarbig, Weiss',
      },
      sku: '35UP004C5BLF6000536',
      price: {
        value: 25.99,
        formatted: '€ 25,99',
        currency: 'EUR',
      },
      name: 'White Marble Premium Hülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/3b25bc32-f3b0-48da-ad0b-4a4b752bb80d.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Schutz Deluxe: Durch einen schockabsorbierenden Zwischenlayer aus Silikon und einer kratzfesten Hartschalen-Rückseite bietet die Premium Handyhülle deinem Smartphone maximalen Schutz.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Schutz Deluxe: Durch einen schockabsorbierenden Zwischenlayer aus Silikon und einer kratzfesten Hartschalen-Rückseite bietet die Premium Handyhülle deinem Smartphone maximalen Schutz.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Orange, Pink',
      },
      sku: '35UP004C5BLF7000634',
      price: {
        value: 25.99,
        formatted: '€ 25,99',
        currency: 'EUR',
      },
      name: 'PEACH Premium Hülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/e50be83f-ae6a-488f-9b65-5f9815839d21.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Schutz Deluxe: Durch einen schockabsorbierenden Zwischenlayer aus Silikon und einer kratzfesten Hartschalen-Rückseite bietet die Premium Handyhülle deinem Smartphone maximalen Schutz.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Schutz Deluxe: Durch einen schockabsorbierenden Zwischenlayer aus Silikon und einer kratzfesten Hartschalen-Rückseite bietet die Premium Handyhülle deinem Smartphone maximalen Schutz.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Einfarbig, Weiss',
      },
      sku: '35UP004C5BLF6000213',
      price: {
        value: 21.99,
        formatted: '€ 21,99',
        currency: 'EUR',
      },
      name: 'White Marble Hardcase Hülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/868db176-46fe-417a-9a79-414f417126ae.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Die Hardcase Handyhülle mit kratzfester Oberfläche ist mit einer einfachen Klickbefestigung an dein Smartphone angebracht. Die Hülle umschließt dein Gerät für optimalen Halt und Schutz.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Die Hardcase Handyhülle mit kratzfester Oberfläche ist mit einer einfachen Klickbefestigung an dein Smartphone angebracht. Die Hülle umschließt dein Gerät für optimalen Halt und Schutz.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Einfarbig, Grau',
      },
      sku: '35UP004C5BLF6000510',
      price: {
        value: 21.99,
        formatted: '€ 21,99',
        currency: 'EUR',
      },
      name: 'SPACE GREY Hardcase Hülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/1861ff52-65e4-4a04-98ea-9d71f9d40ca6.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Die Hardcase Handyhülle mit kratzfester Oberfläche ist mit einer einfachen Klickbefestigung an dein Smartphone angebracht. Die Hülle umschließt dein Gerät für optimalen Halt und Schutz.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Die Hardcase Handyhülle mit kratzfester Oberfläche ist mit einer einfachen Klickbefestigung an dein Smartphone angebracht. Die Hülle umschließt dein Gerät für optimalen Halt und Schutz.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Pink',
      },
      sku: '35UP004C5BLF7000733',
      price: {
        value: 25.99,
        formatted: '€ 25,99',
        currency: 'EUR',
      },
      name: 'WILD ROSE Premium Hülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/38bbde71-4d34-4f88-b3a5-abeb91c4a074.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Schutz Deluxe: Durch einen schockabsorbierenden Zwischenlayer aus Silikon und einer kratzfesten Hartschalen-Rückseite bietet die Premium Handyhülle deinem Smartphone maximalen Schutz.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Schutz Deluxe: Durch einen schockabsorbierenden Zwischenlayer aus Silikon und einer kratzfesten Hartschalen-Rückseite bietet die Premium Handyhülle deinem Smartphone maximalen Schutz.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
    {
      vendor: {
        name: 'caseable',
        logo: {
          square: 'https://static.35up.io/vendors/caseable/logo/square.png',
          landscape: 'https://static.35up.io/vendors/caseable/logo/landscape.png',
        },
        legalName: 'caseable GmbH',
        id: 'caseable',
      },
      specs: {
        type: 'physical',
        color: 'Einfarbig, Schwarz',
      },
      sku: '35UP004C5BLF6000312',
      price: {
        value: 21.99,
        formatted: '€ 21,99',
        currency: 'EUR',
      },
      name: 'Grids Hardcase Hülle',
      images: {
        thumbnail: 'https://static.35up.io/products/caseable/2022/11/02/868e17c2-de73-4560-8a54-ed9a00399322.png?session=123abc',
      },
      descriptions: {
        short: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Die Hardcase Handyhülle mit kratzfester Oberfläche ist mit einer einfachen Klickbefestigung an dein Smartphone angebracht. Die Hülle umschließt dein Gerät für optimalen Halt und Schutz.',
        long: 'Passend für: Apple iPhone 12, Apple iPhone 12 Pro Die Hardcase Handyhülle mit kratzfester Oberfläche ist mit einer einfachen Klickbefestigung an dein Smartphone angebracht. Die Hülle umschließt dein Gerät für optimalen Halt und Schutz.',
      },
      delivery: {
        timeMin: 1,
        timeMax: 7,
      },
      categories: [
        'smartphone-cover',
      ],
      actions: {},
    },
  ],
}));

const port = parseInt(process.argv[2] || '4000', 10);
app.listen({port}, (err, address) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Mock server running at ${address}`);
});
