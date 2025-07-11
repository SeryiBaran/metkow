// Типы для геометрии
export interface Geometry {
  type: 'Point'
  coordinates: [number, number, number] // [lng, lat, elevation?]
}

// Типы для единиц измерения
export interface Units {
  air_pressure_at_sea_level: string
  air_temperature: string
  air_temperature_max: string
  air_temperature_min: string
  cloud_area_fraction: string
  cloud_area_fraction_high: string
  cloud_area_fraction_low: string
  cloud_area_fraction_medium: string
  dew_point_temperature: string
  fog_area_fraction: string
  precipitation_amount: string
  relative_humidity: string
  ultraviolet_index_clear_sky: string
  wind_from_direction: string
  wind_speed: string
}

// Типы для метаданных
export interface Meta {
  updated_at: string
  units: Units
}

// Типы для деталей instant
export interface InstantDetails {
  air_pressure_at_sea_level: number
  air_temperature: number
  cloud_area_fraction: number
  cloud_area_fraction_high: number
  cloud_area_fraction_low: number
  cloud_area_fraction_medium: number
  dew_point_temperature: number
  fog_area_fraction: number
  relative_humidity: number
  ultraviolet_index_clear_sky: number
  wind_from_direction: number
  wind_speed: number
}

// Типы для прогнозных периодов
export interface ForecastSummary {
  symbol_code: string
}

export interface Next1HoursDetails {
  precipitation_amount: number
}

export interface Next6HoursDetails {
  air_temperature_max?: number
  air_temperature_min?: number
  precipitation_amount: number
}

export type Next12HoursDetails = Record<string, never> // Пустой объект

export interface ForecastPeriod<T> {
  summary: ForecastSummary
  details: T
}

// Основные типы данных
export interface TimeseriesDataPoint {
  time: string
  data: {
    instant: {
      details: InstantDetails
    }
    next_1_hours?: ForecastPeriod<Next1HoursDetails>
    next_6_hours?: ForecastPeriod<Next6HoursDetails>
    next_12_hours?: ForecastPeriod<Next12HoursDetails>
  }
}

export interface Properties {
  meta: Meta
  timeseries: TimeseriesDataPoint[]
}

export interface WeatherFeature {
  type: 'Feature'
  geometry: Geometry
  properties: Properties
}

// Корневой тип
export type WeatherData = WeatherFeature
