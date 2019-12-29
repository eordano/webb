import * as d3 from 'd3'
import { DataResponse } from 'dcl/descartes/datadog/getConnectedUsers'
import React, { useEffect } from 'react'

const month = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
}
export function GraphUsersOverTime(props: { data: DataResponse }) {
  const width = 500
  const height = 200
  useEffect(() => {
    if (!props.data) {
      return
    }
    var svg = d3.select('#visualization')
    const data = props.data.series[0].pointlist
    var x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function(d) {
          return d[0]
        })
      )
      .range([0, width])
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function(d) {
          return d[1]
        })
      ])
      .range([height, 0])

    // Add the line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 3.5)
      .attr(
        'd',
        d3
          .line()
          .x(function(d) {
            return x(d[0])
          })
          .y(function(d) {
            return y(d[1])
          })
      )
    var Tooltip = d3
      .select('#div_template')
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      // .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '0px')
      .style('border-radius', '5px')
      .style('padding', '5px')
      .style('position', 'absolute')
      .style('width', '138px')
      .style('height', '68px')
      .style('text-align', 'center')
      .style('z-index', '10000')
    var mouseover = function(d) {
      Tooltip.style('opacity', 1)
    }
    var mousemove = function(d) {
      const relX = d3.mouse(this)[0]
      const relY = d3.mouse(this)[1]
      const date = x.invert(relX)
      const users = y.invert(relY)
      Tooltip.html(`${date.getUTCDate()}/${month[date.getUTCMonth()]} ${date.getUTCHours()}:00 GMT <br/> Users online: ${users.toFixed(0)}`)
        .style('opacity', 1)
        .style('left', relX + 'px')
        // .style('top', (relY - 168) + 'px')
    }
    var mouseleave = function(d) {
      // Tooltip.style('opacity', 0)
    }
    svg
      .data(data)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave)
  })
  return (
    <div id="div_template">
      <svg id="visualization" width={width} height={height} />
    </div>
  )
}
