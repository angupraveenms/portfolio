---
date: '2020-04-01'
weight: 2
title: 'Multi-fidelity Aerodynamic Shape Optimization of a BWB Aircraft '
cover: './p1.png'
slug: '/featured/bwb-optimization'
description: 'Architected a large-scale multi-fidelity optimization framework for a Long Range Blended Wing Body (BWB) aircraft, achieving a 76% reduction in total drag.'
tech:
  - SU2 (CFD)
  - SUAVE
  - OpenVSP
  - GMSH
  - Python
  - Aerodynamics
---

## Project Overview

The Blended Wing Body (BWB) aircraft is a safety-critical airframe configuration designed to meet the rigorous demands of future carbon-neutral aviation. A core challenge in its development is that traditional low-fidelity mission analysis tools often fail to capture complex transonic flow phenomena. This project established a **Multi-fidelity Design Optimization** workflow that bridges the gap between rapid mission simulation and high-fidelity aerodynamic precision, ensuring that the final design captures the non-linear effects of compressibility.

![Aerial view of the initial BWB aircraft geometry generated in OpenVSP](./initial.png)

<p align="center"><em>Figure 1: Initial baseline geometry of the Long Range BWB </em></p>

### The Multi-fidelity Toolchain

I engineered a sophisticated, automated toolchain that couples mission sizing with high-fidelity aerodynamic solvers. This approach overcomes the accuracy limitations of analytical models without the prohibitive computational cost of an all-CFD optimization. The toolchain integrates four primary modules:

1.  **SUAVE:** Managed the global mission-level analysis, including weight estimation, fuel burn, and the overarching sizing loop.
2.  **OpenVSP & GMSH:** Used for parametric vehicle geometry writing and the generation of high-quality surface and volume meshes to ensure stable CFD convergence.
3.  **SU2:** Performed high-fidelity Reynolds-Averaged Navier-Stokes (RANS) simulations to capture shock waves and pressure distributions at transonic speeds.
4.  **Aero Surrogate:** Built a surrogate model from the CFD data to feed high-fidelity aerodynamic coefficients back into the SUAVE mission analysis.

![Detailed 14-step workflow diagram showing the coupling between SUAVE, OpenVSP, GMSH, and SU2 CFD](./tool.png)

<p align="center"><em>Figure 2: Architectural diagram of the multi-fidelity optimization toolchain and automated data flow</em></p>

### Geometry Parametrization & FFD

To allow the aircraft to "morph" into its most aerodynamically efficient shape, I utilized **Free Form Deformation (FFD)**. Unlike traditional parametric methods that are tied to specific geometric features, FFD is independent of the object's underlying topology. This enabled me to deform the entire aircraft including the critical integration zones between the fuselage and wings as a single continuous unit. By manipulating a lattice of control points, the optimization could explore radical shape changes without requiring manual re-meshing for each iteration.

![FFD control points box enclosing the BWB aircraft for shape optimization](./ffd.png)

<p align="center"><em>Figure 3: Free Form Deformation (FFD) lattice used for global geometry morphing and lift distribution control</em></p>

### Performance Breakthroughs

The optimization reached a global solution that yielded transformative aerodynamic and mission-level gains. By capturing the **compressibility drag** that lower-fidelity tools miss, the final design demonstrated a superior lift-to-drag (L/D) profile:

<div style="overflow-x: auto; margin: 3em 0;">
  <table style="width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 0.95em;">
    <thead>
      <tr style="background-color: var(--light-navy); border-bottom: 2px solid var(--green);">
        <th style="width: 40%; text-align: left; padding: 20px; color: var(--green);">Metric</th>
        <th style="width: 20%; text-align: center; padding: 20px; color: var(--green);">Initial Baseline</th>
        <th style="width: 20%; text-align: center; padding: 20px; color: var(--green);">Optimized Design</th>
        <th style="width: 20%; text-align: right; padding: 20px; color: var(--green);">Improvement</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid var(--lightest-navy);">
        <td style="text-align: left; padding: 20px;">Total Drag Coefficient (C<sub>D</sub>)</td>
        <td style="text-align: center; padding: 20px; font-family: var(--font-mono);">0.018629</td>
        <td style="text-align: center; padding: 20px; font-family: var(--font-mono);">0.004480</td>
        <td style="text-align: right; padding: 20px; font-family: var(--font-mono); color: var(--green);"><strong>-75.95%</strong></td>
      </tr>
      <tr style="border-bottom: 1px solid var(--lightest-navy);">
        <td style="text-align: left; padding: 20px;">Max Take-Off Weight (MTOW)</td>
        <td style="text-align: center; padding: 20px; font-family: var(--font-mono);">Baseline</td>
        <td style="text-align: center; padding: 20px; font-family: var(--font-mono);">Optimized</td>
        <td style="text-align: right; padding: 20px; font-family: var(--font-mono); color: var(--green);"><strong>-38.96%</strong></td>
      </tr>
      <tr>
        <td style="text-align: left; padding: 20px;">Fuel Efficiency (kg/seat/100km)</td>
        <td style="text-align: center; padding: 20px; font-family: var(--font-mono);">Baseline</td>
        <td style="text-align: center; padding: 20px; font-family: var(--font-mono);">Optimized</td>
        <td style="text-align: right; padding: 20px; font-family: var(--font-mono); color: var(--green);"><strong>+35.96%</strong></td>
      </tr>
    </tbody>
  </table>
</div>

![Pressure distribution contours across the optimized BWB aircraft body](./p1.png)

<p align="center"><em>Figure 4: Visualizing the optimized pressure distribution across the entire airframe surface</em></p>

![Pressure Coefficient comparison at spanwise stations y = 1m and y = 5m](./p2.png)

<p align="center"><em>Figure 5: Pressure Coefficient (Cp) distribution comparison between initial and optimized designs at key spanwise locations</em></p>

### Conclusion & Aerodynamic Insight

The high-fidelity CFD results from SU2 successfully isolated the compressibility drag that mission-level models typically under-predict. By smoothing the pressure coefficient distribution across the span, the design effectively eliminated shock-induced drag. This allows the BWB to maintain an optimal Lift-to-Drag (L/D) ratio throughout the cruise phase, proving that multi-fidelity workflows are essential for hitting the aggressive fuel-consumption and emission targets of modern aviation.

![Full mission performance comparison showing L/D, AoA, and Lift Coefficient across the flight range](./mission.png)

<p align="center"><em>Figure 6: Mission performance analysis comparing the baseline and optimized SE2A-LR aircraft across its full range</em></p>
