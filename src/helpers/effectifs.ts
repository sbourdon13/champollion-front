import * as dayjs from "dayjs"
import "dayjs/locale/fr"
dayjs.locale("fr")

import { Effectif, EffectifUnit } from "../api/types"
import { MonthData } from "../components/EffectifBarChart"

const formatNumber = (nb: number) => (Number.isInteger(nb) ? nb : nb.toFixed(2))
const formatEffectifs = (effectifs: Effectif[]) =>
  effectifs.map(({ month, nbCdi, nbCdd, nbCtt }) => {
    const date = dayjs(month)

    return {
      date: date.format("YYYY-MM-DD"),
      label: dayjs(date).format("MMM YY"),
      name: dayjs(date).format("MMM YY"),
      cdd: formatNumber(nbCdd),
      cdi: formatNumber(nbCdi),
      ctt: formatNumber(nbCtt),
    } as MonthData
  })

const unitsOptions: {
  key: number
  value: EffectifUnit | null
  label: string
  attr?: {}
}[] = [
  {
    key: 0,
    value: null,
    label: "Sélectionnez l'unité des effectifs à afficher",
    attr: { disabled: true },
  },
  { key: 1, value: "tot", label: "Nombre total de contrats" },
  { key: 2, value: "avg", label: "Nombre moyen mensuel de contrats" },
  { key: 3, value: "ldm", label: "Nombre de contrats au dernier jour du mois" },
  // { key: 4, value: "etp", label: "ETP (équivalent temps plein)" }, // etp not available yet from api
]

const getUnitOptionFromKey = (key: number | string) =>
  unitsOptions.find((option) => String(option.key) == String(key))

export { formatEffectifs, unitsOptions, getUnitOptionFromKey }
