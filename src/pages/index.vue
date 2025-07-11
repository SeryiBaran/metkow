<script setup lang="ts">
import type { WeatherData } from '~/types/weather'
import dayjs from 'dayjs'
import { azimuthToDirection, hpaToMmhg } from '~/utils'

defineOptions({
  name: 'IndexPage',
})

interface Form {
  lat: string
  lon: string
}

const form = useLocalStorage<Form>('metkow__form', {
  lat: '51.509865',
  lon: '-0.118092',
})

const url = computed(() => `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${form.value.lat}&lon=${form.value.lon}`)

const weatherFetch = useFetch(url, {
  immediate: false,
}).json<WeatherData>()

function onSubmit() {
  weatherFetch.execute()
}

const tableData = computed(() => weatherFetch.data.value && weatherFetch.data.value.properties.timeseries.map(timeseriesDataPoint => (
  {
    time: dayjs(timeseriesDataPoint.time).format('YYYY-MM-DD HH:mm'),
    temp: `${timeseriesDataPoint.data.instant.details.air_temperature.toFixed(1)}`,
    pressure: `${hpaToMmhg(timeseriesDataPoint.data.instant.details.air_pressure_at_sea_level).toFixed(1)}`,
    wind: `${timeseriesDataPoint.data.instant.details.wind_speed.toFixed(1)}`,
    wind_dir: `${timeseriesDataPoint.data.instant.details.wind_from_direction}`,
    relative_humidity: `${timeseriesDataPoint.data.instant.details.relative_humidity.toFixed(1)}`,
    cloud_area_fraction: `${timeseriesDataPoint.data.instant.details.cloud_area_fraction}`,
  }
)))
</script>

<template>
  <div>
    <div i-carbon-campsite text-4xl inline-block />
    <p>
      <a rel="noreferrer" href="https://seryibaran.github.io/pi" target="_blank">
        metKoW
      </a>
    </p>
    <p>
      <em text-sm op75>- MET.no, but метко. And W... i forgor, srry XD</em>
    </p>
    <p>
      <em text-sm op75>- Based on Vitesse lite - Opinionated Vite Starter Template</em>
    </p>
    <p>
      <em text-sm op75>Получите ваши корды (например в яндекс картах), вбейте в поля ниже и тыкните по кнопе.</em>
    </p>

    <div py-4 />

    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="lat">
        <el-input v-model="form.lat" />
      </el-form-item>
      <el-form-item label="lon">
        <el-input v-model="form.lon" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          Получить прогноз погоды
        </el-button>
      </el-form-item>
    </el-form>

    <el-divider />

    <template v-if="weatherFetch.isFetching.value">
      Загрузка...
    </template>
    <template v-else-if="weatherFetch.error.value">
      Ошибка! {{ weatherFetch.error.value }}
    </template>
    <template v-else-if="weatherFetch.isFinished && weatherFetch.data.value && tableData">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed width="160" prop="time" label="Время" />
        <el-table-column width="160" prop="temp" label="Температура (°C)" />
        <el-table-column width="160" prop="pressure" label="Давление (mmHg)" />
        <el-table-column width="160" prop="wind" label="Ветер (m/s)" />
        <el-table-column width="280" prop="wind_dir" label="Направление ветра">
          <template #default="scope">
            <span
              class="flex gap-2 items-center"
            ><span
              class="i-carbon:arrow-up text-lg inline-block" :style="{
                transform: `rotate(${scope.row.wind_dir}deg)`,
              }"
            />{{ azimuthToDirection(scope.row.wind_dir) }} ({{ scope.row.wind_dir }})</span>
          </template>
        </el-table-column>
        <el-table-column width="160" prop="relative_humidity" label="Отн. Влажность (%)" />
        <el-table-column width="160" prop="cloud_area_fraction" label="cloud_area_frac (%)" />
      </el-table>
    </template>
  </div>
</template>
