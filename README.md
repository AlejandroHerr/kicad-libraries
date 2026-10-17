# KiCad Libraries

My shared KiCad libraries, used across my projects.

## Libraries

### `synth.pretty`

Footprints for synth panel hardware: pots with their matching knobs, switches, jacks, LEDs, and silkscreen tick marks for knob scales.

| Footprint | Description |
| --- | --- |
| `Knob 1900H` | Pot with a Davies 1900H-style knob |
| `Knob 1900H black_1` | 1900H knob, black variant |
| `Knob 1900H W` | 1900H knob, white variant |
| `Knob 1900H ticks` | Tick marks sized for the 1900H knob |
| `Knob 1900H ticks 11` | 11 tick marks sized for the 1900H knob |
| `Knob classic black` | Pot with a classic knob, black |
| `Knob classic MFB black` | Pot with an MFB-style classic knob, black |
| `Knob classic MFB W` | Pot with an MFB-style classic knob, white |
| `Knob classic MFB Ticks` | Tick marks sized for the MFB classic knob |
| `Thonk Jack` | Thonkiconn 3.5 mm jack |
| `Thonk Jack_1` | Thonkiconn 3.5 mm jack, alternate version |
| `Thonk Jack W` | Thonkiconn 3.5 mm jack, white variant |
| `Switch_SPDT_3pos` | SPDT 3-position toggle switch |
| `Switch_SPST_2pos` | SPST 2-position toggle switch |
| `LED_3mm` | 3 mm LED |
| `ticks_11_7_8` | 11 ticks, radius 7 mm to 8 mm |
| `ticks_11_7_9` | 11 ticks, radius 7 mm to 9 mm |

The folder also holds the 3D models (`.step` / `.stp`) for the knobs, jacks, and switches.

#### Generating tick marks

`generate_ticks.js` writes a footprint of evenly spaced tick lines on `F.SilkS`. The ticks cover 270°, from -135° to +135°, centered at 12 o'clock.

```sh
cd synth.pretty
node generate_ticks.js <numTicks> <startRadius> <endRadius>

# Example: 11 ticks from radius 7.5 mm to 9 mm
node generate_ticks.js 11 7.5 9
```

The output file is named `ticks_<numTicks>_<startRadius>_<endRadius>.kicad_mod`.

## Setup

1. Clone this repo.
2. In KiCad, open **Preferences → Configure Paths** and add a `LIBRARIES` variable that points to the repo folder. The footprints find their 3D models through `${LIBRARIES}`.
3. Open **Preferences → Manage Footprint Libraries** and add `${LIBRARIES}/synth.pretty`.
